import {Injectable, signal} from '@angular/core';
import {UserProfile} from './profile.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly storageKey = 'profile';

    private readonly defaultProfile: UserProfile = {
        name: 'Jane Doe',
        email: 'janedoegmail.com',
        avatar: 'avatar.png'
    };

    readonly profile = signal<UserProfile>(this.loadProfile());

    private loadProfile(): UserProfile {
        const storedProfile = localStorage.getItem(this.storageKey);

        if (!storedProfile) {
            return this.defaultProfile;
        }

        try {
            return JSON.parse(storedProfile) as UserProfile;
        } catch {
            return this.defaultProfile;
        }
    }

    getProfile(): UserProfile {
        return this.profile();
    }

    saveProfile(profile: UserProfile): void {
        localStorage.setItem(this.storageKey, JSON.stringify(profile));
        this.profile.set(profile);
    }

    resetProfile(): void {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.defaultProfile)
        );
        this.profile.set(this.defaultProfile);
    }
}
