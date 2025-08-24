/* eslint-disable no-console */
// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'

import LockIcon from '@mui/icons-material/Lock'

// import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import {
    FIELD_REQUIRED_MESSAGE,
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
    PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserApi } from '~/apis'

function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    // console.log(errors)
    const navigate = useNavigate()

    const submitRegister = (data) => {
        // console.log('submit register: ', data)
        const { email, password } = data
        toast.promise(registerUserApi({ email, password }),
            { pending: 'Registration is in progress...' }
        ).then(user => {
            navigate(`/login?registeredEmail=${user.email}`)
        })
    }

    return (
        <form onSubmit={handleSubmit(submitRegister)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
                    <Box sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
                        {/*<Avatar sx={{ bgcolor: 'primary.main' }}><TrelloIcon /></Avatar>*/}
                    </Box>
                    <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
                        Author: TrungQuanDev
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                // autoComplete="nope"
                                autoFocus
                                fullWidth
                                label="Enter Email..."
                                type="text"
                                variant="outlined"
                                error={!!errors['email']} // boolean kiểm tra nếu có lỗi
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE
                                    }
                                })}
                            />
                            {/* truyền errors của useForm cho prop errors của FieldErrorAlert nếu có lỗi */}
                            <FieldErrorAlert errors={errors} fieldName={'email'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label="Enter Password..."
                                type="password"
                                variant="outlined"
                                error={!!errors['password']} // boolean kiểm tra nếu có lỗi
                                {...register('password', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE
                                    }
                                })}
                            />
                            {/* truyền errors của useForm cho prop errors của FieldErrorAlert nếu có lỗi */}
                            <FieldErrorAlert errors={errors} fieldName={'password'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label="Enter Password Confirmation..."
                                type="password"
                                variant="outlined"
                                error={!!errors['password_confirm']} // boolean kiểm tra nếu có lỗi
                                {...register('password_confirm', {
                                    validate: (value) => {
                                        if (value === watch('password')) return true
                                        return PASSWORD_CONFIRMATION_MESSAGE
                                    }
                                })}
                            />
                            {/* truyền errors của useForm cho prop errors của FieldErrorAlert nếu có lỗi */}
                            <FieldErrorAlert errors={errors} fieldName={'password_confirm'} />
                        </Box>
                    </Box>
                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button
                            className="interceptor-loading"
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Register
                        </Button>
                    </CardActions>
                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography>Already have an account?</Typography>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Log in!</Typography>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default RegisterForm
