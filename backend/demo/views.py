from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from bson.objectid import ObjectId
from pymongo import MongoClient
import json
import os
from dotenv import load_dotenv

# Load environment variables (optional but recommended)
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "your_mongodb_atlas_connection_string")

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["todo_db"]
collection = db["todos"]

@csrf_exempt
def todos(request):
    if request.method == "GET":
        todo_list = []
        for todo in collection.find():
            todo_list.append({
                "id": str(todo["_id"]),
                "title": todo.get("title", ""),
                "description": todo.get("description", ""),
                "completed": todo.get("completed", False)
            })
        return JsonResponse(todo_list, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            result = collection.insert_one({
                "title": data.get("title", ""),
                "description": data.get("description", ""),
                "completed": data.get("completed", False)
            })
            return JsonResponse({"status": "created", "id": str(result.inserted_id)})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def todo_detail(request, id):
    if not ObjectId.is_valid(id):
        return JsonResponse({"error": "Invalid ID"}, status=400)

    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            result = collection.update_one(
                {"_id": ObjectId(id)},
                {"$set": {
                    "title": data.get("title", ""),
                    "description": data.get("description", ""),
                    "completed": data.get("completed", False)
                }}
            )
            if result.modified_count > 0:
                return JsonResponse({"status": "updated"})
            return JsonResponse({"status": "no changes made"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    elif request.method == "DELETE":
        try:
            result = collection.delete_one({"_id": ObjectId(id)})
            if result.deleted_count > 0:
                return JsonResponse({"status": "deleted"})
            return JsonResponse({"status": "not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)
