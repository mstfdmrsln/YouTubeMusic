#include <napi.h>
#include <Windows.h>
#include <winreg.h>
#include <stdio.h>
#include <conio.h>
#include <string>
#include <sstream>
#include <iostream>
#include <cstdio>
#include <cstdint>
#include <sys/stat.h>

namespace securitycontextnamespace
{

    std::string iAmAlive();
    void nextButton();
    void prevButton();
    void pausePlayButton();
    void volumeUpButton();
    void volumeDownButton();
    void volumeMuteButton();

    Napi::String IAmAliveWrapper(const Napi::CallbackInfo &info);
    Napi::String SendPrevButtonWrapper(const Napi::CallbackInfo &info);
    Napi::String SendNextButtonWrapper(const Napi::CallbackInfo &info);
    Napi::String SendPlayPauseButtonWrapper(const Napi::CallbackInfo &info);
    Napi::String SendVolumeUpButtonWrapper(const Napi::CallbackInfo &info);
    Napi::String SendVolumeDownButtonWrapper(const Napi::CallbackInfo &info);
    Napi::String SendVolumeMuteButtonWrapper(const Napi::CallbackInfo &info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);
}

void securitycontextnamespace::nextButton(){
	INPUT ip;    
    ip.type = 1;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    ip.ki.wVk = 0xB0;
    ip.ki.dwFlags = 0;
    SendInput(1, &ip, sizeof(INPUT));
}

void securitycontextnamespace::prevButton(){
	INPUT ip;    
    ip.type = 1;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    ip.ki.wVk = 0xB1;
    ip.ki.dwFlags = 0;
    SendInput(1, &ip, sizeof(INPUT));
}

void securitycontextnamespace::pausePlayButton(){
	INPUT ip;    
    ip.type = 1;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    ip.ki.wVk = 0xB3;
    ip.ki.dwFlags = 0;
    SendInput(1, &ip, sizeof(INPUT));
}

void securitycontextnamespace::volumeUpButton(){
	INPUT ip;    
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    ip.ki.wVk = 0xAF;
    ip.ki.dwFlags = 0;
    SendInput(1, &ip, sizeof(INPUT));
}

void securitycontextnamespace::volumeDownButton(){
	INPUT ip;    
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    ip.ki.wVk = 0xAE;
    ip.ki.dwFlags = 0;
    SendInput(1, &ip, sizeof(INPUT));
}

void securitycontextnamespace::volumeMuteButton(){
	INPUT ip;    
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    ip.ki.wVk = 0xAD;
    ip.ki.dwFlags = 0;
    SendInput(1, &ip, sizeof(INPUT));
}

std::string securitycontextnamespace::iAmAlive()
{
    return "ok";
}

Napi::String securitycontextnamespace::SendNextButtonWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    securitycontextnamespace::nextButton();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::String securitycontextnamespace::SendPrevButtonWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    securitycontextnamespace::prevButton();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::String securitycontextnamespace::SendPlayPauseButtonWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    securitycontextnamespace::pausePlayButton();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::String securitycontextnamespace::SendVolumeDownButtonWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    securitycontextnamespace::volumeDownButton();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::String securitycontextnamespace::SendVolumeUpButtonWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    securitycontextnamespace::volumeUpButton();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::String securitycontextnamespace::SendVolumeMuteButtonWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    securitycontextnamespace::volumeMuteButton();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::String securitycontextnamespace::IAmAliveWrapper(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::String returnValue = Napi::String::New(env, securitycontextnamespace::iAmAlive());

    return returnValue;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("iAmAlive", Napi::Function::New(env, securitycontextnamespace::IAmAliveWrapper));
    exports.Set("medianext", Napi::Function::New(env, securitycontextnamespace::SendNextButtonWrapper));
    exports.Set("mediaprev", Napi::Function::New(env, securitycontextnamespace::SendPrevButtonWrapper));
    exports.Set("mediaplaypause", Napi::Function::New(env, securitycontextnamespace::SendPlayPauseButtonWrapper));
    exports.Set("volumeup", Napi::Function::New(env, securitycontextnamespace::SendVolumeUpButtonWrapper));
    exports.Set("volumedown", Napi::Function::New(env, securitycontextnamespace::SendVolumeDownButtonWrapper));
    exports.Set("mute", Napi::Function::New(env, securitycontextnamespace::SendVolumeMuteButtonWrapper));
    return exports;
}

NODE_API_MODULE(keyboard, InitAll)