#include <iostream>
#include <string>
// #include <strstream>
#include "doctor.h"
#include "patient.h"
#include "appointment.h"
#include "utils.h"

using namespace std;

// main entry of a program
int main()
{

    PatientsLL patients;
    DoctorsLL doctors;
    AppointmentsLL appointments;

    cout << "-----------------------------------" << endl;
    cout << "*  Health Care management System  *" << endl;
    cout << "-----------------------------------" << endl;

    while (true)
    {
        displayHelp();

        int choice = getIntegerInput("Enter your choice (1-7): ");

        switch (choice)
        {
        case 0:
        {
            displayHelp();
            break;
        }
        case 1:
        {
            cout << "--------------------" << endl;
            cout << "PATIENT REGISTRATION" << endl;
            cout << "--------------------" << endl;
            Patient patient;
            patient.patient_id = getIntegerInput("ID: ");

            // if patient id already exists, ask user to enter new id
            if (patients.isPatientExist(patient.patient_id))
            {
                cerr << "Patient ID already exists. Please enter a new ID: " << endl;
                break;
            }
            patient.name = getStringInput("NAME: ");
            patient.dob = getDateInput("Date of Birth (DD/MM/YYYY): ");
            patient.gender = getGender(getIntegerInput("GENDER : "));
            patients.addPatient(patient);
            cout << "Patient registered successfully." << endl;
            break;
        }
        case 2:
        {
            cout << "DOCTOR REGISTRATION" << endl;
            cout << "--------------------" << endl;
            Doctor doctor;
            doctor.doctor_id = getIntegerInput("Enter doctor ID: ");
            // if doctor id already exists, ask user to enter new id
            while (doctors.isDoctorExist(doctor.doctor_id))
            {
                cout << "Doctor ID already exists. Please enter a new ID: ";
                cin >> doctor.doctor_id;
            }
            doctor.name = getStringInput("Name: ");
            doctor.specialization = getStringInput("Specialization: ");
            doctors.addDoctor(doctor);
            cout << "Doctor registered successfully." << endl;
            break;
        }
        case 3:
        {
            cout << "APPOINTMENT REGISTRATION" << endl;
            cout << "-------------------------" << endl;
            Appointment appointment;
            appointment.appointment_id = getIntegerInput("Enter appointment ID: ");
            // if appointment id already exists, ask user to enter new id
            while (appointments.isAppointmentExist(appointment.appointment_id))
            {
                cout << "Appointment ID already exists. Please enter a new ID: ";
                cin >> appointment.appointment_id;
            }
            appointment.patient_id = getIntegerInput("Enter Patient ID: ");
            if (!patients.isPatientExist(appointment.patient_id))
            {
                cout << "Patient not found. Please register patient first." << endl;
                cout << "Available Patients:" << endl;
                patients.displayPatients();
                break;
            }
            appointment.doctor_id = getIntegerInput("Enter doctor ID: ");
            if (!doctors.isDoctorExist(appointment.doctor_id))
            {
                cout << "Doctor not found. Please register patient first." << endl;
                cout << "Available Doctors:" << endl;
                doctors.displayDoctors();
                break;
            }
            appointment.appointment_date = getDateInput("Enter appointment date (DD/MM/YYYY): ");
            appointments.addAppointment(appointment);
            cout << "Appointment registered successfully." << endl;
            break;
        }
        case 4:
        {
            cout << "----------------" << endl;
            cout << "DISPLAY PATIENTS" << endl;
            cout << "----------------" << endl;
            patients.displayPatients();
            break;
        }
        case 5:
        {
            cout << "---------------" << endl;
            cout << "DISPLAY DOCTORS" << endl;
            cout << "---------------" << endl;
            doctors.displayDoctors();
            break;
        }
        case 6:
        {
            cout << "---------------------" << endl;
            cout << "DISPLAY APPOINTMENTS" << endl;
            cout << "---------------------" << endl;
            appointments.displayAppointments();
            break;
        }
        case 7:
        {
            cout << "Exiting program..." << endl;
            return 0;
        }
        default:
            cout << "Invalid choice. Please enter a number between 1 and 5." << endl;
            break;
        }
    }
}
