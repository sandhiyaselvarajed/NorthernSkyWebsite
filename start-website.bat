@echo off
setlocal
title Northern Sky website - local preview
cd /d "%~dp0"

echo.
echo  ================================================
echo   Northern Sky website - local preview
echo  ================================================
echo.

> setup-log.txt echo Started %date% %time%

where node >nul 2>nul
if errorlevel 1 goto nonode

for /f "tokens=1 delims=." %%v in ('node -v') do set NODEMAJOR=%%v
set NODEMAJOR=%NODEMAJOR:v=%
node -v >> setup-log.txt
echo  Node.js version: v%NODEMAJOR%
if %NODEMAJOR% LSS 18 goto oldnode

if exist node_modules\vite\package.json if exist node_modules\sharp\package.json goto run

echo.
echo  First run: installing the website's building blocks.
echo  This takes 2-5 minutes and needs internet. Please wait...
if exist node_modules (
  echo  Removing the old website version's packages first...
  rmdir /s /q node_modules
)
call npm install >> setup-log.txt 2>&1
if errorlevel 1 goto installfail
if not exist node_modules\vite\package.json goto installfail
echo  Install finished.

:run
echo.
echo  Starting the website at http://localhost:5173
echo  Your browser will open automatically in a few seconds.
echo  Keep this window open while you look at the site. Close it to stop.
echo  Edit content\projects.csv or add photos to content\photos and the page refreshes by itself.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "& npm.cmd run dev 2>&1 | Tee-Object -FilePath dev-log.txt"
echo.
echo  The website stopped. If that was unexpected, the details are in dev-log.txt
pause
exit /b

:nonode
echo  Node.js is not installed on this computer.
echo  The download page will open now. Install the LTS version,
echo  restart the computer, then double-click this file again.
start https://nodejs.org/en/download
pause
exit /b

:oldnode
echo  Your Node.js is too old for this website. Version 18 or newer is needed.
echo  The download page will open now. Install the LTS version, then try again.
start https://nodejs.org/en/download
pause
exit /b

:installfail
echo.
echo  Install failed. The details are saved in setup-log.txt in this folder.
echo  Last lines of the log:
echo  ------------------------------------------------
powershell -NoProfile -Command "Get-Content setup-log.txt -Tail 25"
echo  ------------------------------------------------
pause
exit /b
