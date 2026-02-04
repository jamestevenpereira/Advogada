import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

/**
 * Interface representing a lead/appointment request.
 */
export interface Lead {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    reason: string;
    createdAt: any;
}

/**
 * FirebaseService handles all interactions with Firebase services.
 * Currently supports saving leads to Firestore.
 */
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private firestore = inject(Firestore);

    /**
     * Saves a new lead/appointment request to Firestore.
     * This is a secure operation handled on the backend.
     * @param leadData The data from the scheduling form.
     */
    async submitLead(leadData: Omit<Lead, 'createdAt'>): Promise<void> {
        const leadsCollection = collection(this.firestore, 'leads');
        await addDoc(leadsCollection, {
            ...leadData,
            createdAt: serverTimestamp()
        });
    }
}
