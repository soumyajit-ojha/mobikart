from fastapi import UploadFile
import shutil
import os
import uuid

# MOCK S3 Service for now to prevent import errors.
# In a real app, use boto3 to upload to AWS S3.

UPLOAD_DIR = "static/images"
os.makedirs(UPLOAD_DIR, exist_ok=True)


async def upload_image_to_s3(file: UploadFile) -> str:
    """
    Simulates uploading an image to S3.
    Actually saves it to a local static directory for dev purposes.
    """
    # Generate a unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = f"{UPLOAD_DIR}/{unique_filename}"

    # Save locally
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Return a fake S3 URL or local path
    # In production, this would be: f"https://{BUCKET_NAME}.s3.{REGION}.amazonaws.com/{unique_filename}"
    return f"/static/images/{unique_filename}"
