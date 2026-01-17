from fastapi import Header, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserRole


async def get_current_user(user_id: int = Header(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


async def get_current_seller(current_user: User = Depends(get_current_user)):
    if current_user.user_type != UserRole.SELLER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation restricted to Seller accounts only",
        )
    return current_user
