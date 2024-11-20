import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { gtn, ntg } from "./lib/calc";

type FormSchema = { tax: number; number: number };

function App() {
    const [type, setType] = useState("gtn");
    const { register, handleSubmit } = useForm<FormSchema>();
    const priceField = useRef<HTMLInputElement>(null);
    const taxField = useRef<HTMLInputElement>(null);

    function onSubmit(data: FormSchema) {
        console.log(data, type);
        if (type === "gtn") {
            const { netPrice, taxAmount } = gtn(data.tax, data.number);
            priceField.current!.value = netPrice;
            taxField.current!.value = taxAmount;
        } else if (type === "ntg") {
            const { grossPrice, taxAmount } = ntg(data.tax, data.number);
            priceField.current!.value = grossPrice;
            taxField.current!.value = taxAmount;
        }
    }

    return (
        <>
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="flex flex-col gap-5">
                    <h1 className="text-4xl font-black text-center">Áfa Kalkulátor</h1>
                    <Tabs defaultValue={type} className="w-96" onValueChange={setType}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="gtn">Bruttó ➜ Nettó</TabsTrigger>
                            <TabsTrigger value="ntg">Nettó ➜ Bruttó</TabsTrigger>
                        </TabsList>
                        <TabsContent value="gtn">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Nettó ár kalkulátor</CardTitle>
                                        <CardDescription>
                                            Számold ki a nettó árat bruttóból
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="tax">Áfa</Label>
                                            <div className="relative">
                                                <p className="select-none absolute inset-y-0 py-2 right-0 flex items-center text-text-muted-200 px-3 border-l text-base md:text-sm">
                                                    %
                                                </p>
                                                <Input
                                                    id="tax"
                                                    defaultValue={27}
                                                    type="number"
                                                    max={99}
                                                    min={0}
                                                    className="pr-12"
                                                    {...register("tax", { required: true })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Bruttó Ár</Label>
                                            <Input
                                                id="name"
                                                type="number"
                                                step={0.01}
                                                {...register("number", { required: true })}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit">Számolás</Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </TabsContent>
                        <TabsContent value="ntg">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Bruttó ár kalkulátor</CardTitle>
                                        <CardDescription>
                                            Számold ki a bruttó árat nettóból
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="tax">Áfa</Label>
                                            <div className="relative">
                                                <p className="select-none absolute inset-y-0 py-2 right-0 flex items-center text-text-muted-200 px-3 border-l text-base md:text-sm">
                                                    %
                                                </p>
                                                <Input
                                                    id="tax"
                                                    defaultValue={27}
                                                    type="number"
                                                    max={99}
                                                    min={0}
                                                    className="pr-12"
                                                    {...register("tax", { required: true })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Nettó Ár</Label>
                                            <Input
                                                id="name"
                                                type="number"
                                                step={0.01}
                                                {...register("number", { required: true })}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit">Számolás</Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </TabsContent>
                    </Tabs>
                    <Card>
                        <CardHeader>
                            <CardTitle>Eredmény</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="price">
                                    {type === "gtn" ? "Nettó " : "Bruttó "}ár
                                </Label>
                                <Input id="price" defaultValue={0} ref={priceField} readOnly />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="taxvalue">Áfa összege</Label>
                                <Input id="taxvalue" defaultValue={0} ref={taxField} readOnly />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default App;
