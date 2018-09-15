interface TrainingCenter {
  id: number;
  name: string;
  email: string;
  area: string;
  address?: string;
  phone?: string[];
  about?: string;
  logo: string;
  numCourses: number;
  longitude?: number;
  altitude?: number;
}

/*DATABASE NOTATION FOR TRAINING CENTER DATA
 ============================================
 training_center_header COLLECTION
 =================================
 id: number
 name: string
 logo: string;
 numCourses: number
 area: string;

 training_center_detail COLLECTION
 =================================
 id: number
 address: string;
 phone: string[];
 about: string;
 longitude: number;
 altitude: number;
 email: string;
 whatsapp number: number;
 facebook page
 */
