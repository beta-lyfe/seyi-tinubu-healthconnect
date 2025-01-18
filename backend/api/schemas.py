from drf_spectacular.utils import extend_schema, OpenApiResponse
from api.serializer import (UserSerializer,
                            EmailVerifySerializer,
                            EmailSerializer,
                            LoginSerializer)


register_schema = extend_schema(
    tags=['Authentication'],
    summary="User Registration",
    description="Register a new user. Optionally accepts a referral code.",
    request=UserSerializer,
    responses={
        200: OpenApiResponse(description="User registered and email verification OTP sent.",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Please check your email address for a verification code'
                                         },
                                    'data': {
                                        'type': 'object',
                                        'properties': {
                                            'otp': {'type': 'string', 'description': 'Verification OTP'},
                                            'exp': {'type': 'string', 'description': 'OTP expiration timestamp'}
                                        }
                                    }
                                 }
                             }),
        202: OpenApiResponse(description="When User registration is successful but the backend server couldn't send the verification mail\nFrontend should try and send the otp through `resend-verify-email` endpoint",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'User Registered Successfully, Verify your email'
                                    }
                                 }
                             }),
        400: OpenApiResponse(description='Bad Request - Validation Errors',
                             response={
                                'type': 'object',
                                'properties': {
                                    'field_name': {
                                        'type': 'array', 
                                        'items': {'type': 'string'}
                                    }
                                }
                            })
        }
)


verify_email_schema = extend_schema(
    tags=['Authentication'],
    description="Verify user email with the provided OTP.",
    request=EmailVerifySerializer,
    responses={
        200: OpenApiResponse(description="When Email Verification is Succeffuly",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Email verified successfully.'
                                    }
                                 }
                             }),
        400: OpenApiResponse(description="If otp is not passed",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Invalid data.'
                                    }
                                 }
                             }),
        404: OpenApiResponse(description="Invalid or expired verification key.",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Invalid verification key.'
                                    }
                                 }
                             })
                        })

resend_email_schema = extend_schema(
    tags=['Authentication'],
    description="Resend the email verification OTP to the user's email address.",
    request=EmailSerializer,
    responses={
        200: OpenApiResponse(description="OTP sent successfully, Check email for otp code",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'OTP sent successfully, Check email for otp code.'
                                    },
                                    'data': {
                                        'type': 'object',
                                        'example': {'otp': 'String', 'exp': 'TimeStamp'}
                                    }
                                 }
                             }),
        404: OpenApiResponse(description="When the Email parsed does not exist in the database",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Email does not exist'
                                    }
                                 }
                             }),
        500: OpenApiResponse(description="An Unexpected Error from the Backend",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Something went wrong'
                                    }
                                 }
                             }),
        501: OpenApiResponse(description="When the OTP didn't send successfully",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Failed to send otp code. Resend OTP'
                                    }
                                 }
                             })
                    })

login_schema = extend_schema(
    tags=['Authentication'],
    description="Authenticate and login a user using email and password.",
    request=LoginSerializer,
    responses={
        200: OpenApiResponse(description="User logged in successfully with access and refresh tokens.",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Login Successful 🎊'
                                    },
                                    'access': {
                                        'type': 'string',
                                    },
                                    'refresh': {
                                        'type': 'string'
                                    }
                                }
                            }),
        401: OpenApiResponse(description="Username or password is incorrect",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Invalid user credentials'
                                    }
                                 }
                             }),
        406: OpenApiResponse(description="Email not verified",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Email is not verified'
                                    }
                                 }
                             }),
        400: OpenApiResponse(description="Invalid data.",
                             response={
                                 'type': 'object',
                                 'properties': {
                                    'message': {
                                         'type': 'string', 
                                         'example': 'Username or email is required'
                                    }
                                 }
                             })
        })

# forgot_password_schema = extend_schema(
#     tags=['Authentication'],
#     description="Send forgot password OTP to the user's email address.",
#     request=EmailSerializer,
#     responses={
#         200: OpenApiResponse(description="Otp sent successfully",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'Otp sent successfully'
#                                     },
#                                     'data': {
#                                         'type': 'object',
#                                         'example': {'otp': 'String', 'user_id': 'Integer'}
#                                     }
#                                  }
#                              }),
#         404: OpenApiResponse(description="User doesnot exist",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'User with Email does not exist'
#                                     }
#                                  }
#                              }),
#         400: OpenApiResponse(description="Required field missing",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'Email field required'
#                                     }
#                                  }
#                              }),
#         500: OpenApiResponse(description="An Unexpected Error from the Backend",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'Something went wrong'
#                                     }
#                                  }
#                              })
#                     })

# confirm_forgot_password_schema = extend_schema(
#     tags=['Authentication'],
#     description="Confirm the forgot password otp",
#     request=ForgotPasswordSerializer,
#     responses={
#         201: OpenApiResponse(description="Password changed successfully",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'Password Changed successfully'
#                                     }
#                                  }
#                              }),
#         404: OpenApiResponse(description="User doesnot exist",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'User does not exist'
#                                     }
#                                  }
#                              }),
#         400: OpenApiResponse(description="Required field missing",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'Fields Error'
#                                     }
#                                  }
#                              }),
#         500: OpenApiResponse(description="An Unexpected Error from the Backend",
#                              response={
#                                  'type': 'object',
#                                  'properties': {
#                                     'message': {
#                                          'type': 'string', 
#                                          'example': 'Something went wrong'
#                                     }
#                                  }
#                              })
#                     })
