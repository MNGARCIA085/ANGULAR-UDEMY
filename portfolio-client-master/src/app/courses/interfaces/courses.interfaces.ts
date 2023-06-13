export interface Course {
    _id?:        string;
    title:       string;
    certificate: string;
    link:        string;
    repo:        string[];
    description: string;
    instructor:  string;
    image:       string;
    __v?:        number;
}
