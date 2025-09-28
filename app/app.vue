<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "~/components/ui/tabs";
import { Info, RotateCcw, Trophy } from "lucide-vue-next";
import { Label } from "~/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const drawType = ref("number");

const numDrawLen = ref(1);
const startIn = ref(0);
const endIn = ref(10);

const names = ref<string[]>([]);
const itemsDraw = ref<string[]>([]);
const availableDrawItems = ref<string[]>([]);
const repeatDrawItem = ref(false);

const drawLots = () => {
  if (!repeatDrawItem.value && availableDrawItems.value.length === 0) {
    if (drawType.value === "name") {
      availableDrawItems.value = [...names.value];
    } else {
      availableDrawItems.value = Array.from(
        { length: endIn.value + 1 },
        (_, i) => (i + startIn.value).toString()
      );
    }
  }

  console.log(repeatDrawItem.value);
  console.log(availableDrawItems.value);

  let itemDraw = null;

  if (repeatDrawItem.value) {
    let items = [];
    if (drawType.value === "name") {
      items = names.value;
    } else {
      items = Array.from({ length: endIn.value + 1 }, (_, i) =>
        (i + startIn.value).toString()
      );
    }
    let index = Math.floor(Math.random() * items.length);
    itemDraw = items[index];
  } else {
    let index = Math.floor(Math.random() * availableDrawItems.value.length);
    itemDraw = availableDrawItems.value[index];
    availableDrawItems.value.splice(index, 1);
  }

  itemsDraw.value = [...itemsDraw.value, `${itemDraw}`];

  if (
    drawType.value === "number" &&
    itemsDraw.value.length < numDrawLen.value
  ) {
    drawLots();
  }
};

const handleRepeat = () => {
  repeatDrawItem.value = !repeatDrawItem.value;
  itemsDraw.value = [];
  availableDrawItems.value = [...names.value];
  if (!repeatDrawItem.value) {
    numDrawLen.value = 1;
  }
};

const refreshDraw = () => {
  if (itemsDraw.value.length > 0) {
    itemsDraw.value = [];
    availableDrawItems.value = [...names.value];
  }
};

const setDrawType = (type: "number" | "name") => {
  drawType.value = type;
  itemsDraw.value = [];
  availableDrawItems.value = [];
};
</script>

<template>
  <div class="bg-slate-900 flex flex-col items-center min-h-screen">
    <img src="/assets/img/logo.png" class="w-1/2 sm:w-1/5" alt="" />
    <Tabs default-value="number" class="w-5/6 sm:w-2/3 lg:w-1/2">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger
          value="number"
          @click="setDrawType('number')"
          class="cursor-pointer"
        >
          Número
        </TabsTrigger>
        <TabsTrigger
          value="name"
          @click="setDrawType('name')"
          class="cursor-pointer"
        >
          Nome
        </TabsTrigger>
      </TabsList>
      <TabsContent value="number">
        <Card class="">
          <CardHeader>
            <div class="flex flex-row items-center justify-between">
              <CardTitle>Sortedor de números</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button
                      @click="refreshDraw"
                      :disabled="itemsDraw.length === 0"
                      class="cursor-pointer"
                      ><RotateCcw
                    /></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refazer o sorteio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col space-y-5 sm:flex-row sm:items-center sm:space-y-0">
              <div class="flex flex-row items-center">
                <Label>Sortear</Label>
                <Input
                  v-model="numDrawLen"
                  class="w-16 h-12 mx-2 text-center font-bold"
                  type="number"
                  min="1"
                  :max="repeatDrawItem ? 1000 : endIn - startIn + 1"
                ></Input>
                <p>número(s) entre:</p>
              </div>
              <div class="flex flex-row items-center">
                <Input
                  v-model="startIn"
                  class="w-16 h-12 mx-2 text-center font-bold"
                  type="number"
                  min="0"
                  :max="endIn - 1"
                ></Input>
                <p class="mx-2">e</p>
                <Input
                  v-model="endIn"
                  class="w-16 h-12 mx-2 text-center font-bold"
                  type="number"
                  :min="startIn + 1"
                ></Input>
              </div>
            </div>
          </CardContent>
          <CardFooter
            class="flex flex-col items-start sm:flex-row sm:justify-between space-y-5"
          >
            <div class="flex items-center space-x-2">
              <Switch
                id="repeat-numbers"
                @click="handleRepeat"
                :default-value="false"
                :disabled="numDrawLen === 1"
                class="cursor-pointer"
              />
              <Label for="repeat-numbers">Repetir números sorteados</Label>
            </div>
            <Button
              @click="drawLots"
              :disabled="
                (!repeatDrawItem &&
                  availableDrawItems.length === 0 &&
                  itemsDraw.length > 0) ||
                itemsDraw.length === numDrawLen
              "
              class="cursor-pointer w-full sm:w-auto"
              >Sortear</Button
            >
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="name">
        <Card>
          <CardHeader>
            <div class="flex flex-row items-center justify-between">
              <CardTitle>Sorteador de nomes</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button
                      @click="refreshDraw"
                      :disabled="itemsDraw.length === 0"
                      class="cursor-pointer"
                      ><RotateCcw
                    /></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refazer o sorteio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-2">
              <TagsInput v-model="names">
                <TagsInputItem
                  v-for="(item, index) in names"
                  :key="index"
                  :value="item"
                >
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput
                  placeholder="Nomes..."
                  @keyup.enter="refreshDraw"
                />
              </TagsInput>
            </div>
            <Alert>
              <Info class="h-4 w-4" />
              <AlertDescription>
                Escreva um nome e aperte enter para adicionar.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <div class="w-full flex flex-col sm:flex-row justify-between space-y-5">
              <div class="flex items-center space-x-2">
                <Switch
                  id="repeat-names"
                  @click="handleRepeat"
                  :default-value="false"
                  class="cursor-pointer"
                />
                <Label for="repeat-names">Repetir nomes sorteados</Label>
              </div>
              <Button
                @click="drawLots"
                :disabled="
                  names.length <= 1 ||
                  (!repeatDrawItem && itemsDraw.length === names.length)
                "
                class="cursor-pointer"
                >Sortear</Button
              >
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <Card
      v-show="drawType === 'number' && itemsDraw.length > 0"
      class="w-5/6 sm:w-2/3 lg:w-1/2 mt-2"
    >
      <CardHeader>
        <CardTitle>Números sorteados:</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 grid grid-cols-10">
        <div
          v-for="number in itemsDraw"
          :key="number"
          class="bg-[#4367c3] text-white font-bold rounded-full w-10 h-10 p-3 flex flex-row justify-center items-center"
        >
          <p>{{ number }}</p>
        </div>
      </CardContent>
    </Card>
    <Card
      v-show="drawType === 'name' && itemsDraw.length > 0"
      class="w-5/6 sm:w-2/3 lg:w-1/2 mt-2"
    >
      <CardHeader>
        <CardTitle>Nomes sorteados:</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div
          v-for="(name, index) in itemsDraw"
          :key="index"
          class="border-2 rounded-lg p-3 flex flex-row"
        >
          <Trophy
            v-if="index < 3"
            class="mr-2"
            :class="
              index === 0
                ? 'text-[#FFD700]'
                : index === 1
                ? 'text-[#C0C0C0]'
                : 'text-[#CD7F32]'
            "
          />
          <p>{{ name }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
