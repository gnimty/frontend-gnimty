import { HStack, Text } from '@chakra-ui/react';

export default function VerifiedTag() {
  return (
    <HStack bg="main" p="2px 5px 2px 4px" borderRadius="4px" gap="2px">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6.61017 2L1 4.2358L2.3978 8.82191L3.4667 8.70739L3.16944 5.82812L3.52363 5.69179L4.12449 8.6365L5.93973 8.44564L5.61716 5.26645L5.95871 5.13557L6.62282 8.37475L8.46336 8.17843L8.10917 4.69386L8.45704 4.56299L9.1844 8.10209L10.9996 7.91123V2.94885L6.61017 2Z"
          fill="white"
        />
        <path d="M6.74336 8.94754L6.8319 9.40015L11 10V8.50038L6.74968 8.94754H6.74336Z" fill="white" />
      </svg>
      <Text textStyle="caption" fontWeight="bold" color="white">
        인증
      </Text>
    </HStack>
  );
}
