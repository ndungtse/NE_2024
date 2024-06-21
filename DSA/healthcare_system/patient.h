//
// Created by User on 21/06/2024.
//

#ifndef HEALTHCARE_SYSTEM_PATIENT_H
#define HEALTHCARE_SYSTEM_PATIENT_H

#include <iostream>

using namespace std;
// Patient structure
struct Patient
{
    int patient_id;
    string name;
    string dob;
    string gender;
};

struct PatientNode
{
    Patient patientData;
    PatientNode *next;

    PatientNode() : next(nullptr) {}
};


/**
 * A linked list to store patients info
 */
class PatientsLL
{
private:
    PatientNode *head;

public:
    PatientsLL()
    {
        //         std::ifstream file(filename);
        // std::string line;
        // std::vector<Patient> patients;
        head = nullptr;
    }

    void addPatient(Patient patient)
    {
        auto *newNode = new PatientNode;
        newNode->patientData = std::move(patient);
        newNode->next = head;
        head = newNode;
    }

    void displayPatients()
    {
        PatientNode *current = head;
        while (current != nullptr)
        {
            cout << "Patient ID: " << current->patientData.patient_id << " Name: " << current->patientData.name << " Date of Birth: " << current->patientData.dob << " Gender: " << current->patientData.gender << endl;
            current = current->next;
        }
        cout << "-------------------------" << endl;
    }

    bool isPatientExist(int patient_id)
    {
        PatientNode *current = head;
        while (current != nullptr)
        {
            if (current->patientData.patient_id == patient_id)
            {
                return true;
            }
            current = current->next;
        }
        return false;
    }
};

#endif //HEALTHCARE_SYSTEM_PATIENT_H
