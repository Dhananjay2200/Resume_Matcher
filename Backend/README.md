# AI Resume-JD Matcher Backend

## Overview

This is the FastAPI backend for the AI Resume-JD Matcher application.

The backend accepts a resume (PDF) and a job description, extracts relevant information using an LLM, calculates a resume-job match score, and returns personalized suggestions.

---

## Features

- Upload Resume PDF
- Extract text from PDF
- Analyze Resume using LLM
- Analyze Job Description using LLM
- Calculate Resume Match Score
- Find Matched Skills
- Find Missing Skills
- Generate AI Suggestions
- REST API using FastAPI

---

## Tech Stack

- Python
- FastAPI
- pdfplumber
- Sentence Transformers
- Torch
- Hugging Face / Ollama (depending on deployment)

---

## Project Structure

Backend/

```
api/
    matcher.py

services/
    match_service.py

uploads/

main.py

requirements.txt
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to backend

```bash
cd Backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Run

```bash
uvicorn main:app --reload
```

Backend will start at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## API

### POST

```
/api/match
```

### Input

- Resume PDF
- Job Description

### Output

```json
{
    "match_score": 87.5,
    "matched_skills": [
        "Python",
        "FastAPI",
        "PyTorch"
    ],
    "missing_skills": [
        "Docker",
        "AWS"
    ],
    "suggestion": "Add Docker and AWS experience."
}
```

---

## Future Improvements

- Better Skill Extraction
- Multiple Resume Formats
- Resume Ranking
- ATS Score
- Authentication
- Database Integration



