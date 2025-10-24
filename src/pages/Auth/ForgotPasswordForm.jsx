import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import { Box, Button, CardActions, TextField, Typography, Zoom } from '@mui/material'
import MuiCard from '@mui/material/Card'

import HomeIcon from '@mui/icons-material/Home'

import { forgotPasswordApi } from '~/apis'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators.js'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert.jsx'

function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        toast.promise(forgotPasswordApi(data), {
            pending: 'Sending reset email...'
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <MuiCard
                    sx={{
                        minWidth: 380,
                        maxWidth: 380,
                        marginTop: '6em',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(2px)',
                        WebkitBackdropFilter: 'blur(3px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                    }}
                >
                    <Box sx={{ margin: '1em', display: 'flex', justifyContent: 'center' }}>
                        <img
                            src="https://res.cloudinary.com/doam999z1/image/upload/v1754643053/1290288805177200681_bwonbr.png"
                            alt="lock-icon"
                        />
                    </Box>
                    <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
                        Inquisitor
                    </Box>
                    <Box sx={{ marginTop: '1em', padding: '0 1em 1em 1em' }}>
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    background: 'rgba(255,255,255,0.1)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                    '&.Mui-focused fieldset': { borderColor: '#fdba26' }
                                },
                                '& .MuiInputBase-input': { color: 'rgba(255,255,255,0.9)' },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#fdba26' }
                            }}
                            fullWidth
                            label="Enter your email"
                            type="email"
                            variant="outlined"
                            error={!!errors['email']}
                            {...register('email', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                            })}
                        />
                        <FieldErrorAlert errors={errors} fieldName={'email'} />
                    </Box>

                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: '12px',
                                '&:hover': { background: 'rgba(0,0,0,0.8)' }
                            }}
                        >
                            Send Reset Link
                        </Button>
                    </CardActions>

                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>Back to Login?</Typography>
                        <Link to="/login" style={{ textDecoration: 'none', background: 'none' }}>
                            <Typography
                                // sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'rgba(0,0,0,0.6)',
                                    '&:hover': { color: 'rgba(0,0,0,0.8)' }
                                }}
                            >
                                Go to Login
                            </Typography>
                        </Link>
                        <Link to="/" style={{ textDecoration: 'none', background: 'none' }}>
                            <Button
                                variant="outlined"
                                startIcon={<HomeIcon />}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': { color: '#fdba26', borderColor: '#fdba26' }
                                }}>
                                Go Home
                            </Button>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default ForgotPasswordForm