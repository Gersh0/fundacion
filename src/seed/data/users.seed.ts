import { User } from "src/auth/entities/auth.entity";

export const USERS_SEED: User[] = [
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'StrongPass123!',
        phone: '+573003003000',
        address: '123 Main St, Springfield',
        organs: [],
        roles: ['user'],
        id: 0,
        isActive: true
    },
    {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'SecurePass456!',
        phone: '+573003003000',
        address: '456 Elm St, Springfield',
        organs: [],
        roles: ['client'],
        id: 1,
        isActive: true
    },
    {
        name: 'Carol White',
        email: 'carol.white@example.com',
        password: 'Password789!',
        phone: '+573003003000',
        address: '789 Oak St, Springfield',
        organs: [],
        roles: ['provider'],
        id: 2,
        isActive: true
    },
    {
        name: 'David Brown',
        email: 'david.brown@example.com',
        password: 'MyPass123!',
        phone: '+573003003000',
        address: '101 Pine St, Springfield',
        organs: [],
        roles: ['client'],
        id: 3,
        isActive: true
    },
    {
        name: 'Eve Davis',
        email: 'eve.davis@example.com',
        password: 'PassWord456!',
        phone: '+573003003000',
        address: '202 Maple St, Springfield',
        organs: [],
        roles: ['provider'],
        id: 4,
        isActive: true
    },
    {
        name: 'Frank Wilson',
        email: 'frank.wilson@example.com',
        password: 'Secure789!',
        phone: '+573003003000',
        address: '303 Birch St, Springfield',
        organs: [],
        roles: ['client'],
        id: 5,
        isActive: true
    },
    {
        name: 'Grace Lee',
        email: 'grace.lee@example.com',
        password: 'StrongPass123!',
        phone: '+573003003000',
        address: '404 Cedar St, Springfield',
        organs: [],
        roles: ['client'],
        id: 6,
        isActive: true
    },
    {
        name: 'Henry Walker',
        email: 'henry.walker@example.com',
        password: 'MySecurePass456!',
        phone: '+573003003000',
        address: '505 Walnut St, Springfield',
        organs: [],
        roles: ['provider'],
        id: 7,
        isActive: true
    },
    {
        name: 'Ivy Harris',
        email: 'ivy.harris@example.com',
        password: 'PassWord789!',
        phone: '+573003003000',
        address: '606 Chestnut St, Springfield',
        organs: [],
        roles: ['client'],
        id: 8,
        isActive: true
    },
    {
        name: 'Jack Martinez',
        email: 'jack.martinez@example.com',
        password: 'SecurePass123!',
        phone: '+573003003000',
        address: '707 Willow St, Springfield',
        organs: [],
        roles: ['client'],
        id: 9,
        isActive: true
    }
];