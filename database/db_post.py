from sqlalchemy.orm.session import Session
import datetime
from fastapi import HTTPException, status

from routers.schemas import PostBase
from database.models import Dbpost


def create(db: Session, request: PostBase):
    new_post = Dbpost(
        image_url=request.image_url,
        title=request.title,
        content=request.content,
        creator=request.creator,
        timestamp=datetime.datetime.now(),
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post



def get_all(db: Session):
    return db.query(Dbpost).all()



def delete(db:Session, id:int):
    post = db.query(Dbpost).filter(Dbpost.id== id).first()
    if not post:
        raise  HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'post with id {id} not found'
        )
    db.delete(post)
    db.commit()
    return 'ok'