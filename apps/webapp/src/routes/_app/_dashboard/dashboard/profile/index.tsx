import { MainLayout } from '../-components/main-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@beta-lyfe/ui/components/shad/ui/avatar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Input } from '@beta-lyfe/ui/components/input'
import { Label } from '@beta-lyfe/ui/components/shad/ui/label'
import { Textarea } from '@beta-lyfe/ui/components/shad/ui/textarea'
import { Switch } from '@beta-lyfe/ui/components/shad/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@beta-lyfe/ui/components/shad/ui/select'
import { Upload } from 'lucide-react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useAuth } from '../../../../../hooks/auth'
import { toast } from 'sonner'
import { $api, client } from '../../../../../lib/backend'
import { ChangeEvent, useRef } from 'react'

export const Route = createFileRoute('/_app/_dashboard/dashboard/profile/')({
  component: ProfilePage
})

function ProfilePage() {
  const user=useAuth(true).data.data.user
  let profile=user.profiles.patient
  const update=useAuth().update
  const token=useAuth(true).data.data.token
  const router=useRouter()
  
    const logout=async ()=>{
    update({status:'unauthenticated'})
    toast.success("Logged user out")  
    router.navigate({
      to:'/auth/sign-in'
    })
  }

  async function refetchProfile(){
  
        const result = await client.GET('/api/patients/profile', {
            headers: {
              Authorization: `Bearer ${token.access_token}`
            }
          })
  
          if (
            result.error?.code === 'PATIENT_PROFILE_NOT_FOUND_ERROR' ||
            result.error?.code === 'UNAUTHORIZED_ERROR' ||
            result.error?.code === 'UNEXPECTED_ERROR'
          ) {
            router.navigate({
              to: '/auth/set-profile',
              search: {
                token: token.access_token
              }
            })
            return
          }
  
          if (result.data) {
            profile = result.data.data
          }
        
  
        update({
          status: 'authenticated',
          data: {
            token: {
              access_token: token.access_token,
              refresh_token: token.refresh_token
            },
            user: {
              data: user.data,
              profiles: {  patient: profile }
            }
          }
        })
    }
  
  

  const {mutate}=$api.useMutation('post','/api/patients/profile/upload/profile-image',{
    onSuccess:()=>{
      toast.message("Profile image set successfully")
      refetchProfile()
    },
    onError:()=>{
      toast.error("Could not upload profile picture")
    }
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (!file) return

    // Optionally, validate file type/size here
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Please select a JPEG or PNG image.')
      return
    }

    const formdata=new FormData()
    formdata.append('file',file)

    mutate({
      body:formdata
      ,
      headers:{
        'Authorization':`Bearer ${token.access_token}`
      }
    })
    toast.success(`Selected file: ${file.name}`)
    }
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              Your Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <Button className='text-white'>Save Changes</Button>
        </div>

        {/* Profile tabs */}
        <Tabs defaultValue="personal">
          <TabsList className="mb-4 overflow-auto w-full pl-32 md:pl-0">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.profile_picture?.url} alt="User" />
                      <AvatarFallback>{profile?.first_name[0]}{profile?.last_name[0]}</AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      hidden
                      ref={fileInputRef}
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                    <Button variant="outline" size="sm" onClick={()=>
                      fileInputRef.current?.click()
                    } >
                      <Upload className="mr-2 h-4 w-4" /> Change Photo
                    </Button>
                  </div>

                  <div className="grid gap-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" defaultValue={profile?.first_name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" defaultValue={profile?.last_name} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={profile?.email}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue={profile?.phone_number}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of birth</Label>
                      <Input id="dob" type="date" defaultValue={profile?.date_of_birth!} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select defaultValue='male'>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Contact Information</CardTitle>
                <CardDescription>
                  Update your address and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Main St" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" defaultValue="94105" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">
                    Emergency contact name
                  </Label>
                  <Input id="emergencyContact" defaultValue="Jane Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">
                    Emergency contact phone
                  </Label>
                  <Input id="emergencyPhone" defaultValue="+1 (555) 987-6543" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">
                    Relationship to emergency contact
                  </Label>
                  <Input id="relationship" defaultValue="Spouse" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <Card>
              <CardHeader className='text-lg'>
                <CardTitle className='text-lg'>Medical History</CardTitle>
                <CardDescription>
                  Provide information about your medical history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conditions">
                    Existing medical conditions
                  </Label>
                  <Textarea
                    id="conditions"
                    placeholder="List any existing medical conditions..."
                    defaultValue="Hypertension, diagnosed in 2018"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any allergies..."
                    defaultValue="Penicillin, Peanuts"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current medications</Label>
                  <Textarea
                    id="medications"
                    placeholder="List any medications you're currently taking..."
                    defaultValue="Lisinopril 10mg (daily), Atorvastatin 20mg (daily)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surgeries">Past surgeries</Label>
                  <Textarea
                    id="surgeries"
                    placeholder="List any past surgeries..."
                    defaultValue="Appendectomy (2010)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familyHistory">Family medical history</Label>
                  <Textarea
                    id="familyHistory"
                    placeholder="Provide information about family medical history..."
                    defaultValue="Father: Heart disease, Mother: Diabetes"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Lifestyle Information</CardTitle>
                <CardDescription>
                  Information about your lifestyle habits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smoking">Smoking status</Label>
                  <Select defaultValue="never">
                    <SelectTrigger id="smoking">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never smoked</SelectItem>
                      <SelectItem value="former">Former smoker</SelectItem>
                      <SelectItem value="current">Current smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcohol">Alcohol consumption</Label>
                  <Select defaultValue="occasional">
                    <SelectTrigger id="alcohol">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="frequent">Frequent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise">Exercise frequency</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger id="exercise">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">
                        Light (1-2 days/week)
                      </SelectItem>
                      <SelectItem value="moderate">
                        Moderate (3-4 days/week)
                      </SelectItem>
                      <SelectItem value="active">
                        Active (5+ days/week)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diet">Diet description</Label>
                  <Textarea
                    id="diet"
                    placeholder="Describe your typical diet..."
                    defaultValue="Balanced diet with limited processed foods. Trying to reduce sodium intake."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-md'>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Two-factor authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a verification code via SMS when signing in
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="biometric">Biometric authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition to sign in on your
                      devices
                    </p>
                  </div>
                  <Switch id="biometric" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-md'>Privacy Settings</CardTitle>
                <CardDescription>
                  Control how your information is used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSharing">
                      Data sharing with healthcare providers
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow your data to be shared with your healthcare
                      providers
                    </p>
                  </div>
                  <Switch id="dataSharing" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymousData">
                      Anonymous data for research
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow your anonymized data to be used for medical research
                    </p>
                  </div>
                  <Switch id="anonymousData" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing communications from Beta-Lyfe
                    </p>
                  </div>
                  <Switch id="marketing" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className='text-md'>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="appointmentReminders">
                      Appointment reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming appointments
                    </p>
                  </div>
                  <Switch id="appointmentReminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="medicationReminders">
                      Medication reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders to take your medications
                    </p>
                  </div>
                  <Switch id="medicationReminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="labResults">Lab results</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when lab results are available
                    </p>
                  </div>
                  <Switch id="labResults" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="prescriptions">Prescription updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about prescription refills and
                      updates
                    </p>
                  </div>
                  <Switch id="prescriptions" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotions">Promotions and offers</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about special offers and promotions
                    </p>
                  </div>
                  <Switch id="promotions" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-md'>Notification Channels</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">
                      Email notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch id="emailNotifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch id="smsNotifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">
                      Push notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch id="pushNotifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to="/auth/sign-in">
          <Button className="text-white" onClick={()=>logout()}>Logout</Button>
        </Link>
      </div>
    </>
  )
}
function arrayBufferToBase64(file: File): string | PromiseLike<string> {
  throw new Error('Function not implemented.')
}

