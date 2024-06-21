//
// Created by User on 21/06/2024.
//

#ifndef HEALTHCARE_SYSTEM_UTILS_H
#define HEALTHCARE_SYSTEM_UTILS_H

#include <iostream>
#include <limits>

using namespace std;

// Function to get date input from user with validation
string getDateInput(const string &prompt)
{

    string input;
    cout << prompt;
    getline(cin, input);
    return input;
}

// Function to get integer input from user with validation
int getIntegerInput(const string &prompt)
{
    int value;
    while (true)
    {
        cout << prompt;
        if (cin >> value)
        {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return value;
        }
        else
        {
            cout << "Invalid input. Please enter a valid integer." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }
    }
}

// Function to get string input from user with validation
inline string getStringInput(const string &prompt)
{
    string input;
    cout << prompt;
    getline(cin, input);
    return input;
}

void displayHelp()
{
    cout << "0. Help" << endl;
    cout << "1. Register Patient" << endl;
    cout << "2. Register a Doctor" << endl;
    cout << "3. Register an appointment" << endl;
    cout << "4. Display Patients" << endl;
    cout << "5. Display Doctors" << endl;
    cout << "6. Display Appointments" << endl;
    cout << "7. Exit" << endl;
    cout << "-------------------------" << endl;
}

string getGender(int gen)
{
    if (gen == 0)
        return "Female";
    return "Male";
}

#endif //HEALTHCARE_SYSTEM_UTILS_H
