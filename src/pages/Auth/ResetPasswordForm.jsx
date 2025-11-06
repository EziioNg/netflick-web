import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

import { useParams, useNavigate } from 'react-router-dom'

import {Avatar, Box, Button, CardActions, TextField, Typography, Zoom} from '@mui/material'
import MuiCard from '@mui/material/Card'

import { resetPasswordApi } from '~/apis'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators.js'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert.jsx'
import LockIcon from "@mui/icons-material/Lock";

function ResetPasswordForm() {
    const { token } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const onSubmit = async (data) => {
        toast.promise(
            resetPasswordApi({ token, newPassword: data.newPassword }),
            { pending: 'Resetting password...' }
        ).then(res => {
            navigate('/login')
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
                        {/*<img*/}
                        {/*    src="https://res.cloudinary.com/doam999z1/image/upload/v1754643053/1290288805177200681_bwonbr.png"*/}
                        {/*    alt="lock-icon"*/}
                        {/*/>*/}
                        <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
                    </Box>
                    <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
                        Welcome
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
                            label="New Password"
                            type="password"
                            variant="outlined"
                            error={!!errors['newPassword']}
                            {...register('newPassword', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
                            })}
                        />
                        <FieldErrorAlert errors={errors} fieldName={'newPassword'} />
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
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            error={!!errors['confirmPassword']}
                            {...register('confirmPassword', {
                                required: FIELD_REQUIRED_MESSAGE,
                                validate: (value) => value === watch('newPassword') || 'Passwords do not match'
                            })}
                        />
                        <FieldErrorAlert errors={errors} fieldName={'confirmPassword'} />
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
                            Confirm Reset
                        </Button>
                    </CardActions>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default ResetPasswordForm
