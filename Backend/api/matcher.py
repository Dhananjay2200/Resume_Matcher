import os 
import shutil
from fastapi import APIRouter,UploadFile,Form,File
from services.match_service import MatchService

router = APIRouter()
matcher = MatchService()

@router.post('/match')
async def match_resume(resume:UploadFile=File(...),job_desc:str=Form(...)):
    os.makedirs('uploads',exist_ok=True)
    file_path = f"uploads/{resume.filename}"

    with open(file_path,'wb') as buffer:
        shutil.copyfileobj(resume.file,buffer)
        result = matcher.match_resume(file_path,job_desc)
        os.remove(file_path)
    return result