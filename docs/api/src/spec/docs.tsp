import "@typespec/rest";

using TypeSpec.Http;

@service({
  title: "API Documentation",
})
namespace ApiDocs;

@route("/api")
@doc("API")
namespace Api {

  @route("/auth")
  namespace Authentication {

    model SignInCredentials {
      email: string;
      password: string;
    }

    model SignUpCredentials {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      role: "patient" | "doctor";
    }
    
    
    @error
    model UnexpectedError {
      @statusCode code: 500;
      message: string;
    }
    
    model AuthCredentials {
      token: string;
    }

    model WelcomeMessage {
      message: "Please check your email address for a verification code";
    }
    
    
    @route("/sign-in") op signIn(@body thing: SignInCredentials): AuthCredentials | UnexpectedError;
    @route("/sign-up") op signUp(@body thing: SignUpCredentials): WelcomeMessage | UnexpectedError;
  }
}