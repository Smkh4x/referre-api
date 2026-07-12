import * as z from "zod"
export const validationMatch = (req, res, next) => {
    const {
        equipeDomicile,
        equipeExterieur,
        stade,
        villeHote,
        dateMatch,
        phase
    } = req.body;
    if (!equipeDomicile || !equipeExterieur || !stade || !villeHote || !dateMatch || !phase) {
        return res.status(400).json({
            message: "please add all information"
        })
    }
    next();
}

export const validationArbitre = (req, res, next) => {
    const {
        nom,
        prenom,
        nationalite,
        confederation,
        categorie,
        status
    } = req.body;
    if (!nom || !prenom || !nationalite || !confederation || !categorie || !status) {
        return res.status(400).json({
            message: "please add all information"
        })
    }
    next();
}

export const validationAffecation = (req, res, next) => {
    const {
        role,
        matchId,
        arbitreId
    } = req.body;
    if (!role || !matchId || !arbitreId) {
        return res.status(400).json({
            message: "you need some information"
        })
    }
    next();

}
export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if(!result.success) return res.status(400).json({errors: result.error.errors})
            req.body = result.data;
        next()
    }
}
