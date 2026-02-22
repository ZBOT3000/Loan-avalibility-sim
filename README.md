# Loan Eligibility Simulator

A production-ready loan eligibility simulation application built with React and TypeScript.
Users can input personal, financial, and loan details to receive a structured eligibility analysis including affordability metrics and recommended loan terms.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Docker (Nginx production build)

## Features

- Multi-section form (Personal Info, Financial Info, Loan Details)
- Strongly typed request/response models
- Mock API simulation for POST /api/loans/eligibility
- Realistic eligibility calculation logic
- Modal-based results display
- Loading & error states
- Responsive design
- Production Docker build

## Run locally

1. Install dependencies - npm install
2. Build project - npm run build
3. Start development server - npm run dev
4. Open - http://localhost:5173

## Running with Docker

- docker build -t loan-simulator .
- docker run -p 3000:80 loan-simulator
- http://localhost:3000

## Run Tests

1. Install dependencies - npm install
2. Run tests - npm test

## Architecture Overview
- components/ → UI components
- services/loanService.ts → Mock API layer
- types/loan.types.ts → Request & response contracts
- utils/ → Business logic & calculations
- Multi-stage Docker build for production deployment