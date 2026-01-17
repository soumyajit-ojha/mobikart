from sqlalchemy import Column, Integer, ForeignKey, Enum, Float, String, String
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class CartStatus(enum.Enum):
    CURRENT = "current"
    PREVIOUS = "previous"
    CANCELED = "canceled"
    ORDERED = "ordered"


class Cart(BaseModel):
    __tablename__ = "carts"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    status = Column(Enum(CartStatus), default=CartStatus.CURRENT)

    # Total price of this specific cart instance
    total_amount = Column(Float, default=0.0)

    # Relationships
    user = relationship("User", back_populates="carts")
    items = relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )


class CartItem(BaseModel):
    __tablename__ = "cart_items"

    cart_id = Column(Integer, ForeignKey("carts.id", ondelete="CASCADE"))
    product_id = Column(
        Integer, ForeignKey("products.id", ondelete="SET NULL"), nullable=True
    )

    quantity = Column(Integer, default=1)

    # SNAPSHOTS: Crucial for "No Data Loss"
    # Even if the product is deleted or price changes, we keep these values.
    product_name_snapshot = Column(String(200))
    price_at_addition = Column(Float)

    # Relationships
    cart = relationship("Cart", back_populates="items")
    product = relationship(
        "Product", back_populates="cart_items"
    )  # Link to the actual product (if it still exists)


class Wishlist(BaseModel):
    __tablename__ = "wishlist"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="wishlist")
    product = relationship("Product", back_populates="wishlist_items")
