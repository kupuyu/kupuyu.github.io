@echo off
setlocal
cd /d "%~dp0"

set "NODE_EXE=C:\Users\iu\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%NODE_EXE%" set "NODE_EXE=node"

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }" >nul 2>&1
if not errorlevel 1 (
  start "" "http://127.0.0.1:5173/"
  exit /b
)

start "Portfolio Preview Server" cmd /k "%NODE_EXE% node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173 --strictPort"
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:5173/"
endlocal
