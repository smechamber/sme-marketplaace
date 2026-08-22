@echo off
setlocal
cd /d "%~dp0"
echo Preparing shared Prisma client...
call npx prisma generate
if errorlevel 1 (
  echo Stop existing Node dev servers, then run startall.bat again.
  pause
  exit /b 1
)

start "MySME API :3003" /D "%~dp0apps\api" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul
start "MySME User :3000" /D "%~dp0apps\user" cmd /k "npm run dev"
start "MySME Seller :3001" /D "%~dp0apps\seller" cmd /k "npm run dev"
start "MySME Admin :3002" /D "%~dp0apps\admin" cmd /k "npm run dev"

echo User:   http://localhost:3000
echo Seller: http://localhost:3001
echo Admin:  http://localhost:3002
echo API:    http://localhost:3003
pause
