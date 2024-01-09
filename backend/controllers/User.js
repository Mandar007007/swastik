const User = require('../models/User')
const {sendEmail} = require('../middlewares/sendEmail')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        let user = await User.findOne({ email });
        
        if (user && user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'User already exists',
            });
        }

        if (!user) {
            user = await User.create({
                name,
                email,
                password,
                avtar: { public_id: 'sample id', url: 'sample url' },
            });
            
            const otp = await user.generateOTP();
            
            user.verifyOTP = `${otp}`
            user.verifyOTPexpires = Date.now()

            await user.save()
            await sendEmail({
                email,
                subject: 'SWASTIK Registration VERIFICATION',
                message:  `your OTP is ${otp}`,
            });

            res.status(200).json({
                success: true,
                otp,
                message: 'OTP sent Successfully to your email',
            });

        }
        else{
            const otp = await user.generateOTP();
            

            user.verifyOTP = `${otp}`
            user.verifyOTPexpires = new Date(Date.now() + 1 * 60 * 1000)
            await user.save()
            await sendEmail({
                email:user.email,
                subject: 'SWASTIK REGISTRATION VERIFICATION',
                message:  `your OTP is ${otp}`,
            });

            res.status(200).json({
                success: true,
                otp,
                message: 'OTP sent Successfully to your email',
            });

        }

    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try{
        const {otp,email} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        console.log(user.verifyOTPexpires + " "+ Date.now())

        if(user.verifyOTPexpires.getTime() < Date.now())
        {
            return res.status(404).json({
                success:false,
                message:'INVALID or EXPIRED opt'
            })
        }

        if(user.verifyOTP != otp)
        {
            return res.status(404).json({
                success:false,
                message:'INVALID otp'
            })
        }

        user.isVerified = true;
        user.save()

        res.status(200).json({
            success:true,
            message:'Successfully verified',
            user
        })


    }catch(err)
    {
        
        res.status(500).json({
            success: false,
            error:err.message,
        })
    }
}

exports.login = async (req,res) => {
    try{

        const {email, password} = req.body

        const user = await User.findOne({email: email});

        if(!user || !user.isVerified)
        {
            return res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        const token = await user.getToken();
        
        res.cookie("token",token,{expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), httpOnly: true }).status(200).json({
            success:true,
            user

        })        


    }catch(err)
    {
        return res.status(500).json({
            success:false
        })
    }
}

exports.loadUser = async (req,res) => {
    try{
        const {token} = req.cookies

        if(!token)
        {
            return res.status(404).json({
                success:false,
                message:'Login First'
            })
        }

        const decoded_id = await jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findOne({_id: decoded_id._id})

        res.status(200).json({
            success:true,
            user
        })

    }catch(err)
    {
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
}