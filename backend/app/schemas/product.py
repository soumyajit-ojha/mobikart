from pydantic import BaseModel
from typing import Optional, List


class ProductBase(BaseModel):
    brand: str
    model_name: str
    price: float
    stock: int
    description: Optional[str] = None
    ram: int
    rom: int
    network_type: str
    processor: str
    battery: int
    screen_size: float


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    # All fields optional for partial updates
    price: Optional[float] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: int
    seller_id: Optional[int]
    image_url: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True
