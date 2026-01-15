from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.products import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate
from app.api.deps import get_current_seller
from app.services.s3_service import upload_image_to_s3  # Assuming s3 service exists
from typing import List

router = APIRouter()


@router.post("/add", response_model=ProductResponse)
async def add_mobile(
    brand: str = Form(...),
    model_name: str = Form(...),
    price: float = Form(...),
    stock: int = Form(...),
    ram: int = Form(...),
    rom: int = Form(...),
    network_type: str = Form(...),
    processor: str = Form(...),
    battery: int = Form(...),
    screen_size: float = Form(...),
    image: UploadFile = File(...),
    seller: User = Depends(get_current_seller),
    db: Session = Depends(get_db),
):
    # 1. Upload image to S3
    image_url = await upload_image_to_s3(image)

    # 2. Create Product
    new_product = Product(
        seller_id=seller.id,
        brand=brand,
        model_name=model_name,
        price=price,
        stock=stock,
        ram=ram,
        rom=rom,
        network_type=network_type,
        processor=processor,
        battery=battery,
        screen_size=screen_size,
        image_url=image_url,
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@router.get("/my-inventory", response_model=List[ProductResponse])
async def get_seller_inventory(
    seller: User = Depends(get_current_seller), db: Session = Depends(get_db)
):
    # Sellers can see even their inactive (soft-deleted) products
    return db.query(Product).filter(Product.seller_id == seller.id).all()


@router.put("/update/{product_id}", response_model=ProductResponse)
async def update_mobile(
    product_id: int,
    obj_in: ProductUpdate,
    seller: User = Depends(get_current_seller),
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id, Product.seller_id == seller.id)
        .first()
    )
    if not product:
        raise HTTPException(
            status_code=404, detail="Product not found or not authorized"
        )

    update_data = obj_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


@router.delete("/delete/{product_id}")
async def soft_delete_mobile(
    product_id: int,
    seller: User = Depends(get_current_seller),
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id, Product.seller_id == seller.id)
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # SOFT DELETE: keep the data, just deactivate it
    product.is_active = False
    db.commit()
    return {"message": "Product deactivated successfully"}
