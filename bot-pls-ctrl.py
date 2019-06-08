import sys
from subprocess import Popen, PIPE
from pywinauto.application import Application
from pywinauto.keyboard import send_keys

app = Application().connect(path='F:\SteamLibrary\steamapps\common\GRIS\GRIS.exe')
app_dialog = app.top_window()
app_dialog.maximize()
app_dialog.set_focus()

binds = []
state = []
bindsctrl = ["!w", "!a", "!s", "!d", "!space", "!sing", "!stone"]
bindvalue = {
    '!w': ',',
    '!a': 'a',
    '!s': 'o',
    '!d': 'e',
    '!space': 'space',
    '!sing': 'h',
    '!stone': 't'
}
app = Popen(['node', 'main.js'], stdout=PIPE)
buffer = b''
while True:
    out = app.stdout.read(1)
    if out == b'\n':
        binds.append(buffer)
        print(binds)
        if binds in bindsctrl:
            if "active" in state:
                state.remove("active")
                send_keys("{" + bindvalue.get(binds) +" up}")
            else:
                state.append("active")
                send_keys("{h" + bindvalue.get(binds) + " down}")
        buffer = b''
        binds.clear()
    else:
        buffer += out







    



