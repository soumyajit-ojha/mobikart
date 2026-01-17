from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, JSON, Enum
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class Product(BaseModel):
    __tablename__ = "products"

    # Relationship to Seller
    # If seller is deleted, product stays (seller_id becomes NULL)
    seller_id = Column(
        Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    # Core Product Info
    brand = Column(String(100), index=True)
    model_name = Column(String(200), index=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    description = Column(String(1000))
    image_url = Column(String(500))  # S3 URL

    # Mobile Specific Specs (Filtering)
    ram = Column(Integer)  # GB
    rom = Column(Integer)  # GB
    network_type = Column(String(50))  # 5G, 4G
    processor = Column(String(100))
    battery = Column(Integer)  # mAh
    screen_size = Column(Float)

    # Status
    is_active = Column(Boolean, default=True)  # For Soft Delete

    # Relationships
    seller = relationship("User", back_populates="products")
    cart_items = relationship("CartItem", back_populates="product")
    wishlist_items = relationship("Wishlist", back_populates="product")
