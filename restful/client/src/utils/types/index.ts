import React from 'react';

export interface IModel {
   createdAt: string;
   updatedAt: string;
   id: string;
}

export interface User extends IModel {
   email: string;
   fullName: string;
}

export interface IStatsCardProps {
   icon: React.ReactNode;
   title: string;
   value: string | number;
   color?: string;
   description?: string;
   iconColor?: string;
}

export interface Book extends IModel {
   name: string;
   publisher: string;
   author: string;
   publicationYear: string;
   subject: string;
}
