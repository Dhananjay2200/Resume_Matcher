import pdfplumber
import google.generativeai as genai
import  json
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GENMINI_API_KEY")
model = genai.GenerativeModel("gemini-2.5-flash")


class MatchService:
    def ask_llm(self, prompt):

        response = model.generate_content(prompt)
    
        return respose.text


    def extract_text(self,pdf_path):
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text +=page_text + '\n'
        return text
    
    def extract_resume(self,resume_text):
        prompt = f"""
    You are an ATS AI

    Analyze the following resume and extract the following information in JSON format:
    {{
    "skills":[],
    "experience":[],
     "education":[] 
    }}

    Resume:
    {resume_text}
    
"""
        response = self.ask_llm(prompt)
        return json.loads(response)

    def extract_job_description(self,jd):
        prompt = f"""
    You are an ATS AI
    Analyze the following job description and extract the following information in JSON format:
    {{
    "skills":[],
    "experience":[], 
    "education":[]
    }}

    Job Description:
    {jd}

"""
        
        response = self.ask_llm(prompt)
        return json.loads(response)

    def calculate_score(self,resume_skill,jd_skill):
        matched = list(set(resume_skill) & set(jd_skill))

        missing = list(set(jd_skill) - set(resume_skill))

        score = len(matched) / max(len(jd_skill),1) *100

        return score,matched,missing
    def generate_suggestion(self,resume,jd):
        prompt = f"""
    compare this Resume and Job Description. 
    and give me suggestions 
    to improve the resume to match the job description.

    Resume:
    {resume}

    Job Description:
    {jd}

"""
        response = self.ask_llm(prompt)
        return json.loads(response)

    def match_resume(self,pdf_path,jd):
        resume_text = self.extract_text(pdf_path)
        resume = self.extract_resume(resume_text)

        jd = self.extract_job_description(jd)
        score,matched,missing = self.calculate_score(resume['skills'],jd['skills'])
        suggestion = self.generate_suggestion(resume_text,jd)

        return {
            "match_score":round(score,2),
            "matched_skills":matched,
            "missing_skills":missing,
            "suggestion":suggestion
       }
