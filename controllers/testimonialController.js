import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req,res) => {

    const {nombre,correo,mensaje} = req.body;
    const errores = [];

    //validar formulario
    if(nombre.trim()===''){
        errores.push({mensaje:'El nombre es requerido.'});
    }
    if(correo.trim()===''){
        errores.push({mensaje:'El correo es requerido.'});
    }
    if(mensaje.trim()===''){
        errores.push({mensaje:'El mensaje es requerido.'});
    }

    if(errores.length > 0){
        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        //mostrar vista con errores
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        try {
            //almacenar en la bd
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            
            //redirigir al usuario a testimoniales
            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error);
        }
    }
    
}

export {
    guardarTestimonial,
}