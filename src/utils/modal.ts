export const modalHeader = (value:"a" | "u" | "v") =>{
    if(value === "a"){
        return "Tambah Data"
    } else if(value === "u"){
        return "Ubah Data"
    }
    return "Lihat Data"
}
