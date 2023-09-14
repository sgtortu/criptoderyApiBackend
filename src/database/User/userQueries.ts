import { User } from "../../models/User";

export const userQueries = {
    create: (data: User) => `
        INSERT INTO Users (
            id, 
            createdAt, 
            email,
            password,
            status,
            name,
            lastname,
            isDeleted,
            profileImageUrl,
            birthdate,
            role,
            phoneNumber,
            updatedAt
        )
        SELECT
            "${data.id}",
            "${data.createdAt}",
            "${data.email}",
            "${data.password}",
            ${data.status ? `"${data.status}"` : null},
            "${data.name}",
            "${data.lastname}",
            "${data.isDeleted}",
            ${data.profileImageUrl ? `"${data.profileImageUrl}"` : null},
            ${data.birthdate ? `"${data.birthdate}"` : null},
            "${data.role}",
            ${data.phoneNumber ? `"${data.phoneNumber}"` : null},
            "${data.updatedAt}"
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1
            FROM Users
            WHERE email = "${data.email}"
        );
    `,
    selectAll: () => "SELECT * FROM Users"
}