//
// Created by User on 21/06/2024.
//

#ifndef HEALTHCARE_SYSTEM_DOCTOR_H
#define HEALTHCARE_SYSTEM_DOCTOR_H
#include <iostream>

using namespace std;

struct Doctor
{
    int doctor_id;
    string name;
    string specialization;
};

struct DoctorNode
{
    Doctor doctorData;
    DoctorNode *next;

    DoctorNode() : next(nullptr) {}
};

class DoctorsLL
{
private:
    DoctorNode *head;

public:
    DoctorsLL()
    {
        head = nullptr;
    }

    void addDoctor(Doctor doctor)
    {
        auto *newNode = new DoctorNode;
        newNode->doctorData = std::move(doctor);
        newNode->next = head;
        head = newNode;
        //        delete newNode;
    }

    void displayDoctors()
    {
        DoctorNode *current = head;
        while (current != nullptr)
        {
            cout << "Doctor ID: " << current->doctorData.doctor_id << " Name: " << current->doctorData.name << " Specialization: " << current->doctorData.specialization << endl;
            cout << "-------------------------" << endl;
            current = current->next;
        }
    }

    bool isDoctorExist(int doctor_id)
    {
        DoctorNode *current = head;
        while (current != nullptr)
        {
            if (current->doctorData.doctor_id == doctor_id)
            {
                return true;
            }
            current = current->next;
        }
        return false;
    }
};


#endif //HEALTHCARE_SYSTEM_DOCTOR_H
