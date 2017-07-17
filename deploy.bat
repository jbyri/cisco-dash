del /f /q %cd%\var\www\html\* && npm install && gulp deployRelease && xcopy /s /y /e /q %cd%\node_modules %cd%\var\www\html\node_modules\
