@echo off

start cmd /k "cd apps\web && npm run dev"
start cmd /k "cd apps\admin && npm run dev"
start cmd /k "cd apps\api && npm run dev"

pause