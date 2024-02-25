from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


from database.database import Base
from database.database import engine
from routers import post


app = FastAPI()
app.include_router(post.router)


origins = ["http://localhost:3000"]


Base.metadata.create_all(engine)

app.mount("/images", StaticFiles(directory="images"), name="images")


app.add_middleware(
    CORSMiddleware,
    allow_hosts=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
