cmake_minimum_required(VERSION 3.28)
project(healthcare_system)

set(CMAKE_CXX_STANDARD 17)

add_executable(healthcare_system main.cpp
        doctor.h
        patient.h
        appointment.h
        utils.h)
