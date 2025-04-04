import { createFileRoute } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@beta-lyfe/ui/components/shad/ui/card"
import { Button } from "@beta-lyfe/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@beta-lyfe/ui/components/shad/ui/avatar"
import { Badge } from "@beta-lyfe/ui/components/shad/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@beta-lyfe/ui/components/shad/ui/tabs"
import {
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Activity,
  Heart,
  Pill,
  FlaskRoundIcon as Flask,
  AlertCircle,
  Clipboard,
  ArrowLeft,
  Video,
} from "lucide-react"
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_doctor/doctor/dashboard/patients/$id/',
)({
  component: PatientDetailPage
})




export default function PatientDetailPage() {
  // In a real app, you would fetch patient data based on the ID
  const patientName = Route.useParams().id

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/doctor/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients
          </Link>
        </Button>
      </div>

      {/* Patient profile */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Patient" />
                <AvatarFallback>
                  {patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center md:items-start gap-2">
                <Button size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h1 className="text-2xl font-bold">{patientName}</h1>
                  <Badge variant="outline" className="w-fit">
                    Patient ID: P-{Math.floor(Math.random() * 10000)}
                  </Badge>
                </div>
                <p className="text-muted-foreground">45 years • Male • Blood Type: O+</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Heart className="h-3 w-3" /> Hypertension
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Diabetes Type 2
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Penicillin Allergy
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>patient@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>123 Main St, San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Patient since: Jan 2023</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button>
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Add Medical Note
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient details tabs */}
      <Tabs defaultValue="medical-history">
        <TabsList className="mb-4">
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="medical-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Conditions</CardTitle>
              <CardDescription>Patient's diagnosed conditions and health issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                  <div className="bg-red-100 p-2 rounded-md dark:bg-red-900">
                    <Heart className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <p className="font-medium">Hypertension (Stage 2)</p>
                        <p className="text-sm text-muted-foreground">Diagnosed: March 2020</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      Blood pressure consistently above 140/90 mmHg. Patient is on medication and lifestyle
                      modifications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                  <div className="bg-blue-100 p-2 rounded-md dark:bg-blue-900">
                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <p className="font-medium">Type 2 Diabetes Mellitus</p>
                        <p className="text-sm text-muted-foreground">Diagnosed: June 2021</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      HbA1c: 7.2%. Patient is on oral hypoglycemic agents and dietary control.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
              <CardDescription>Known allergies and reactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-amber-100 p-2 rounded-md dark:bg-amber-900">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Penicillin</p>
                  <p className="text-sm text-muted-foreground">Severity: Moderate</p>
                  <p className="text-sm mt-2">Develops rash and hives. No anaphylaxis reported.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Surgical History</CardTitle>
              <CardDescription>Past surgeries and procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <Clipboard className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Appendectomy</p>
                      <p className="text-sm text-muted-foreground">Date: May 2015</p>
                    </div>
                  </div>
                  <p className="text-sm mt-2">Laparoscopic appendectomy for acute appendicitis. No complications.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Scheduled consultations with this patient</CardDescription>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" /> Schedule New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-md dark:bg-primary/20">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Follow-up consultation</h3>
                      <p className="text-sm text-muted-foreground">Review of medication effectiveness</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Today
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 10:00 AM
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm">Start Call</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>Previous consultations with this patient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-muted p-3 rounded-md">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Initial consultation</h3>
                      <p className="text-sm text-muted-foreground">Evaluation of heart condition</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2 weeks ago
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Summary
                    </Button>
                    <Button size="sm">Schedule Follow-up</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Medications</CardTitle>
                  <CardDescription>Active prescriptions</CardDescription>
                </div>
                <Button>
                  <Pill className="mr-2 h-4 w-4" /> Add Prescription
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-green-100 p-2 rounded-md dark:bg-green-900">
                  <Pill className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Lisinopril</p>
                      <p className="text-sm text-muted-foreground">10mg, Once daily</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Prescribed: April 15, 2023</p>
                    <p>Refills remaining: 3</p>
                    <p>Next refill date: June 15, 2023</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Discontinue
                    </Button>
                    <Button size="sm">Renew</Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-green-100 p-2 rounded-md dark:bg-green-900">
                  <Pill className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Metformin</p>
                      <p className="text-sm text-muted-foreground">500mg, Twice daily with meals</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Prescribed: June 10, 2023</p>
                    <p>Refills remaining: 5</p>
                    <p>Next refill date: July 10, 2023</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Discontinue
                    </Button>
                    <Button size="sm">Renew</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medication History</CardTitle>
              <CardDescription>Past prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-muted p-2 rounded-md">
                  <Pill className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Amlodipine</p>
                      <p className="text-sm text-muted-foreground">5mg, Once daily</p>
                    </div>
                    <Badge variant="outline">Discontinued</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Prescribed: January 5, 2023</p>
                    <p>Discontinued: April 15, 2023</p>
                    <p>Reason: Switched to Lisinopril due to side effects</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-results" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lab Results</CardTitle>
                  <CardDescription>Test results and diagnostics</CardDescription>
                </div>
                <Button>
                  <Flask className="mr-2 h-4 w-4" /> Order New Test
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <Flask className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Complete Blood Count (CBC)</p>
                      <p className="text-sm text-muted-foreground">Ordered by: Dr. Sarah Johnson</p>
                    </div>
                    <Badge variant="outline">Results Available</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Date completed: May 10, 2023</p>
                    <p>Lab: LabCorp Downtown</p>
                  </div>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    View Results
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <Flask className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Lipid Panel</p>
                      <p className="text-sm text-muted-foreground">Ordered by: Dr. Sarah Johnson</p>
                    </div>
                    <Badge variant="outline">Results Available</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Date completed: May 10, 2023</p>
                    <p>Lab: LabCorp Downtown</p>
                  </div>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    View Results
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <Flask className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">HbA1c Test</p>
                      <p className="text-sm text-muted-foreground">Ordered by: Dr. Sarah Johnson</p>
                    </div>
                    <Badge>Pending</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Scheduled for: June 20, 2023</p>
                    <p>Lab: LabCorp Downtown</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Clinical Notes</CardTitle>
                  <CardDescription>Medical observations and treatment plans</CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" /> Add Note
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-blue-100 p-2 rounded-md dark:bg-blue-900">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Follow-up Consultation</p>
                      <p className="text-sm text-muted-foreground">By: Dr. Sarah Johnson</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 2 weeks ago
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      Patient reports improved energy levels but still experiencing occasional chest discomfort. Blood
                      pressure readings at home averaging 135/85 mmHg. Adjusted Lisinopril dosage from 5mg to 10mg
                      daily. Advised to continue monitoring blood pressure twice daily and maintain low-sodium diet.
                    </p>
                    <p className="text-sm mt-2">
                      Plan: Follow-up in 4 weeks. Order lipid panel and HbA1c prior to next visit.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Print
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-blue-100 p-2 rounded-md dark:bg-blue-900">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Initial Consultation</p>
                      <p className="text-sm text-muted-foreground">By: Dr. Sarah Johnson</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 2 months ago
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      New patient presenting with complaints of fatigue, headaches, and occasional chest pain. Blood
                      pressure elevated at 150/95 mmHg. Family history of hypertension and diabetes. Physical
                      examination unremarkable except for elevated BP.
                    </p>
                    <p className="text-sm mt-2">
                      Assessment: Likely essential hypertension, rule out secondary causes. Possible type 2 diabetes
                      given family history and symptoms.
                    </p>
                    <p className="text-sm mt-2">
                      Plan: Start Lisinopril 5mg daily. Order CBC, comprehensive metabolic panel, lipid panel, and
                      HbA1c. Lifestyle modifications discussed including DASH diet and regular exercise. Follow-up in 2
                      weeks.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Print
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

