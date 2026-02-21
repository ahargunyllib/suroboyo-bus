import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useItemContext,
} from "../../components/ui/accordion";
import {
  faqTypes,
  getFaqByType,
  getFaqTypeById,
  type faqs,
  type FAQType,
} from "../../data/faq";
import { cn } from "../../lib/utils";

export default function Screen() {
  const [type, setType] = useState<FAQType>("operational");

  return (
    <SafeAreaView className="flex-1 bg-[#F3F5F9]">
      <View className="flex-row items-center gap-2 bg-[#F3F5F9] px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">FAQ</Text>
      </View>
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4">
        <View className="items-center justify-center">
          <Text className="text-center font-bold text-[#4CD964]">
            Pertanyaan yang sering diajukan
          </Text>
          <Text className="text-center font-bold text-[#A6A6A6] text-xs">
            Temukan jawaban terbaik dari pertanyaan atau permasalahan Anda
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {faqTypes.map((faqType) => (
            <Button
              className={cn(
                "rounded-lg shadow-none",
                faqType.id === type
                  ? "bg-[#F70000] text-white active:bg-[#F70000]/80"
                  : "border border-[#F70000] bg-transparent active:bg-[#F70000]/10"
              )}
              key={faqType.id}
              onPress={() => setType(faqType.id as FAQType)}
            >
              <Text
                className={cn(
                  "font-bold text-xs",
                  faqType.id === type ? "text-white" : "text-[#F70000]"
                )}
              >
                {faqType.name}
              </Text>
            </Button>
          ))}
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-xs">
            Pertanyaan Seputar {getFaqTypeById(type)?.name}
          </Text>
          <Accordion className="w-full gap-2" collapsible type="single">
            {getFaqByType(type).map((faq) => (
              <FaqItem faq={faq} key={faq.id} />
            ))}
          </Accordion>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FaqItem({ faq }: { faq: (typeof faqs)[number] }) {
  return (
    <AccordionItem key={faq.id} value={faq.id.toString()}>
      <FaqTrigger faq={faq} />
      <AccordionContent className="rounded-b-lg border border-[#DEC6C6] bg-[#E02922] p-4">
        <Text className="text-balance font-semibold text-white text-xs">
          {faq.answer}
        </Text>
      </AccordionContent>
    </AccordionItem>
  );
}

function FaqTrigger({ faq }: { faq: (typeof faqs)[number] }) {
  const { isExpanded } = useItemContext();

  return (
    <AccordionTrigger
      className="border border-[#DEC6C6] bg-white p-4"
      style={{
        borderBottomLeftRadius: isExpanded ? 0 : 8,
        borderBottomRightRadius: isExpanded ? 0 : 8,
      }}
    >
      <Text className="flex-1 font-semibold text-black text-xs">
        {faq.question}
      </Text>
    </AccordionTrigger>
  );
}
