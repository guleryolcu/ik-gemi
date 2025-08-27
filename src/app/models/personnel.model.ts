
export interface Personnel {
    id: number;
    firstName: string;
    lastName?: string;
    email?: string;
    position?: string;
    department?: string;
    startDate?: string; 
    totalLeave: number;
    usedLeave: number;
    workingStatus: 'Çalışıyor' | 'İzinli' | 'Uzaktan';
    photoUrl?: string;
}
