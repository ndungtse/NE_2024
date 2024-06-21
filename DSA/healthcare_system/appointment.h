//
// Created by User on 21/06/2024.
//
#include <iostream>

#ifndef HEALTHCARE_SYSTEM_APPOINTMENT_H
#define HEALTHCARE_SYSTEM_APPOINTMENT_H

using namespace std;

struct Appointment
{
    int appointment_id;
    int patient_id;
    int doctor_id;
    string appointment_date;
};

struct AppointmentNode
{
    Appointment appointmentData;
    AppointmentNode *next;

    AppointmentNode() : next(nullptr) {}
};

class AppointmentsLL
{
private:
    AppointmentNode *head;

public:
    AppointmentsLL()
    {
        head = nullptr;
    }

    void addAppointment(Appointment appointment)
    {
        auto *newNode = new AppointmentNode;
        newNode->appointmentData = std::move(appointment);
        newNode->next = head;
        head = newNode;
        //        delete newNode;
    }

    // show all appointments
    void displayAppointments()
    {
        AppointmentNode *current = head;
        while (current != nullptr)
        {
            cout << "Appointment ID: " << current->appointmentData.appointment_id << endl;
            cout << "Patient ID: " << current->appointmentData.patient_id << endl;
            cout << "Doctor ID: " << current->appointmentData.doctor_id << endl;
            cout << "Date: " << current->appointmentData.appointment_date << endl;
            cout << endl;
            current = current->next;
        }
    }

    // check if appointment exists
    bool isAppointmentExist(int appointment_id)
    {
        AppointmentNode *current = head;
        while (current != nullptr)
        {
            if (current->appointmentData.appointment_id == appointment_id)
            {
                return true;
            }
            current = current->next;
        }
        return false;
    }
};

#endif //HEALTHCARE_SYSTEM_APPOINTMENT_H
