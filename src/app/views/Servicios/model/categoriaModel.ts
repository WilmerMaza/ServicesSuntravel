

export interface categoria {
  ID: string
  codigo: string
  name: string
  describe: string
  createdAt: string
  updatedAt: string
}


export interface tservicios {
  ID: string
  codigo: string
  name: string
  describe: string
  createdAt: string
  updatedAt: string
}


export interface destino {
  ID: string
  codigo: string
  name: string
  createdAt: string
  updatedAt: string
}




export interface services {
  ID: string
  name: string
  codigo: string
  estado: string
  precio_adulto: string
  precio_nino: string
  hora_inicio: string
  duracion: string
  lugar: string
  descripcion: string
  galeria: string
  salida_horarios: string
  recomendaciones: string
  createdAt: string
  updatedAt: string
  destinoId: string
  tservicioId: string
  categoriaId: string
  Destino: Destino
  Tservicio: Tservicio
  Categorium: Categorium
  imgFile?:any
}

export interface Destino {
  ID: string
  codigo: string
  name: string
}

export interface Tservicio {
  ID: string
  codigo: string
  name: string
}

export interface Categorium {
  ID: string
  codigo: string
  name: string
}


export interface file {

  type:string,
  name:string
}
