from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm.session import Session
import string
import random
import shutil


from routers.schemas import PostBase, PostDisplay
from database.database import get_db
from database import db_post

router = APIRouter(prefix="/post", tags=["post"])


@router.post("/")
def create(request: PostBase, db: Session = Depends(get_db)):
    return db_post.create(db, request)


@router.get("/all")
def posts(db: Session = Depends(get_db)):
    return db_post.get_all(db)


@router.delete("/{id}")
def delete_post(id: int, db: Session = Depends(get_db)):
    return db_post.delete(db, id)


@router.post("/image")
def upload_image(image: UploadFile = File(...)):
    letters = string.ascii_letters
    rand_str = "".join(random.choice(letters) for i in range(6))
    new = f'{rand_str}.'
    filename = new.join(image.filename.rsplit('.',1))
    path = f'images/{filename}'
    
    with open(path, 'w+b') as buffer:
        shutil.copyfileobj(image.file, buffer)
        
        
    return {'filename': path}
        
