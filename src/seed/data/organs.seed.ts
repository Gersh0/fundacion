import { Organ } from "src/organ/entities/organ.entity";
import { USERS_SEED } from "./users.seed";

export const ORGANS_SEED: Organ[] = [
    {
        type: 'Kidney',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[2],
        client: USERS_SEED[1],
        id: 1
    },
    {
        type: 'Liver',
        availability: false,
        qualityChecks: [],
        provider: USERS_SEED[4],
        client: USERS_SEED[3],
        id: 2
    },
    {
        type: 'Heart',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[2],
        client: USERS_SEED[6],
        id: 3
    },
    {
        type: 'Lung',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[7],
        client: USERS_SEED[8],
        id: 4
    },
    {
        type: 'Pancreas',
        availability: false,
        qualityChecks: [],
        provider: USERS_SEED[4],
        client: USERS_SEED[9],
        id: 5
    },
    {
        type: 'Intestine',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[7],
        client: USERS_SEED[9],
        id: 6
    },
    {
        type: 'Cornea',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[2],
        client: USERS_SEED[5],
        id: 7
    },
    {
        type: 'Skin',
        availability: false,
        qualityChecks: [],
        provider: USERS_SEED[7],
        client: USERS_SEED[3],
        id: 8
    },
    {
        type: 'Bone Marrow',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[7],
        client: USERS_SEED[5],
        id: 9
    },
    {
        type: 'Blood',
        availability: true,
        qualityChecks: [],
        provider: USERS_SEED[4],
        client: USERS_SEED[1],
        id: 10
    }
];