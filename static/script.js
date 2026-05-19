// ---------- DOM ELEMENTS ----------

const htmlRoot = document.documentElement;

const welcomeScreen = document.getElementById("welcomeScreen");
const appShell = document.getElementById("appShell");
const timeGreeting = document.getElementById("timeGreeting");
const welcomeHeadline = document.getElementById("welcomeHeadline");
const welcomeNameInput = document.getElementById("welcomeNameInput");
const welcomeThemeSelect = document.getElementById("welcomeThemeSelect");
const enterAppBtn = document.getElementById("enterAppBtn");

const mainGreeting = document.getElementById("mainGreeting");
const goalLabel = document.getElementById("goalLabel");

const openSettingsBtn = document.getElementById("openSettingsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const settingsDrawer = document.getElementById("settingsDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

const settingsNameInput = document.getElementById("settingsNameInput");
const settingsThemeSelect = document.getElementById("settingsThemeSelect");
const settingsVibeSelect = document.getElementById("settingsVibeSelect");
const settingsMusicInput = document.getElementById("settingsMusicInput");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const clearSettingsBtn = document.getElementById("clearSettingsBtn");

const notesInput = document.getElementById("notesInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const errorMessage = document.getElementById("errorMessage");

const recentBriefsSection = document.getElementById("recentBriefsSection");
const recentBriefsList = document.getElementById("recentBriefsList");
const clearRecentBtn = document.getElementById("clearRecentBtn");

const statsSection = document.getElementById("statsSection");
const resultsSection = document.getElementById("resultsSection");

const wordCountOutput = document.getElementById("wordCountOutput");
const sentenceCountOutput = document.getElementById("sentenceCountOutput");
const sessionTypeOutput = document.getElementById("sessionTypeOutput");
const masteredCountOutput = document.getElementById("masteredCountOutput");

const soundtrackTitle = document.getElementById("soundtrackTitle");
const soundtrackDescription = document.getElementById("soundtrackDescription");
const soundtrackOpenLink = document.getElementById("soundtrackOpenLink");
const youtubePlayer = document.getElementById("youtubePlayer");
const playerEmbedWrap = document.getElementById("playerEmbedWrap");
const playerFallbackText = document.getElementById("playerFallbackText");

const studyPlanOutput = document.getElementById("studyPlanOutput");
const keywordsOutput = document.getElementById("keywordsOutput");
const summaryOutput = document.getElementById("summaryOutput");
const keyIdeasOutput = document.getElementById("keyIdeasOutput");
const simpleOutput = document.getElementById("simpleOutput");
const flashcardsOutput = document.getElementById("flashcardsOutput");

const progressText = document.getElementById("progressText");
const copySummaryBtn = document.getElementById("copySummaryBtn");
const downloadBtn = document.getElementById("downloadBtn");


// ---------- STATE ----------

let selectedGoal = "summarize";
let latestStudyBrief = null;
let masteredCards = new Set();

const sampleNotes = {
    biology: `Photosynthesis is the process plants use to convert sunlight into chemical energy. This process happens mainly in the chloroplasts of plant cells. Chlorophyll absorbs light energy from the sun. Plants use carbon dioxide and water to create glucose and oxygen. Glucose gives the plant energy to grow, while oxygen is released into the atmosphere. Photosynthesis is important because it supports plant life and helps produce the oxygen many organisms need to survive.`,

    history: `The Industrial Revolution was a period of major economic and technological change that began in Great Britain in the late 1700s. During this period, many societies shifted from handmade production to machine-based manufacturing. Factories became more common, and cities grew as people moved for work. New inventions such as the steam engine increased production and transportation. While the Industrial Revolution created economic growth, it also caused difficult working conditions, pollution, and social inequality.`,

    cs: `Object-oriented programming is a programming model based on classes and objects. A class acts like a blueprint, while an object is an instance created from that blueprint. Encapsulation protects data by keeping details inside a class. Inheritance allows one class to reuse features from another class. Polymorphism allows methods to behave differently depending on the object using them. These concepts help programmers organize code, reduce repetition, and build flexible software.`
};

const vibePlayerLinks = {
    lofi: {
        title: "Lo-fi Focus",
        description: "A soft background mix for steady study sessions.",
        embed: "https://www.youtube.com/embed/jfKfPfyJRdk",
        open: "https://www.youtube.com/results?search_query=lofi+study+playlist"
    },
    rain: {
        title: "Rain Ambience",
        description: "Gentle rain sounds for calm reading and review.",
        embed: "https://www.youtube.com/embed/mPZkdNFkNps",
        open: "https://www.youtube.com/results?search_query=rain+ambience+study"
    },
    classical: {
        title: "Classical Study",
        description: "Instrumental classical music for focused work.",
        embed: "https://www.youtube.com/embed/4Tr0otuiQuU",
        open: "https://www.youtube.com/results?search_query=classical+music+for+studying"
    },
    ambient: {
        title: "Ambient Deep Work",
        description: "Ambient sounds for longer deep-focus sessions.",
        embed: "https://www.youtube.com/embed/5qap5aO4i9A",
        open: "https://www.youtube.com/results?search_query=deep+work+ambient+music"
    }
};


// ---------- INITIALIZE ----------

initializeApp();

function initializeApp() {
    setWelcomeGreeting();

    const savedName = localStorage.getItem("brieflyUserName") || "";
    const savedTheme = localStorage.getItem("brieflyTheme") || "lavender";
    const savedVibe = localStorage.getItem("brieflyStudyVibe") || "lofi";
    const savedMusic = localStorage.getItem("brieflyCustomMusic") || "";

    welcomeNameInput.value = savedName;
    welcomeThemeSelect.value = savedTheme;

    settingsNameInput.value = savedName;
    settingsThemeSelect.value = savedTheme;
    settingsVibeSelect.value = savedVibe;
    settingsMusicInput.value = savedMusic;

    applyTheme(savedTheme);
    updateWelcomeHeadline(savedName);
    updateMainGreeting(savedName);
    updateRecentBriefsDisplay();

    // Always show the opening screen first.
    welcomeScreen.classList.remove("hidden-app");
    appShell.classList.add("hidden-app");
}


// ---------- WELCOME SCREEN ----------

function setWelcomeGreeting() {
    const greeting = getTimeGreeting();
    timeGreeting.textContent = greeting;
}

function getTimeGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    }

    if (hour < 17) {
        return "Good afternoon";
    }

    return "Good evening";
}

function updateWelcomeHeadline(name) {
    const greeting = getTimeGreeting();

    if (name) {
        welcomeHeadline.textContent = `${greeting}, ${name}.`;
    } else {
        welcomeHeadline.textContent = `${greeting}.`;
    }
}

function updateMainGreeting(name) {
    const greeting = getTimeGreeting();

    if (name) {
        mainGreeting.textContent = `${greeting}, ${name}`;
    } else {
        mainGreeting.textContent = `${greeting}, welcome back`;
    }
}

document.querySelectorAll(".goal-choice").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".goal-choice").forEach(btn => {
            btn.classList.remove("selected-goal");
        });

        button.classList.add("selected-goal");
        selectedGoal = button.dataset.goal;

        const labelMap = {
            summarize: "Goal: Summarize",
            flashcards: "Goal: Flashcards",
            review: "Goal: Calm Review"
        };

        goalLabel.textContent = labelMap[selectedGoal] || "Goal: Summarize";
    });
});

enterAppBtn.addEventListener("click", () => {
    const name = welcomeNameInput.value.trim();
    const theme = welcomeThemeSelect.value;

    savePreference("brieflyUserName", name);
    savePreference("brieflyTheme", theme);

    settingsNameInput.value = name;
    settingsThemeSelect.value = theme;

    applyTheme(theme);
    updateWelcomeHeadline(name);
    updateMainGreeting(name);

    welcomeScreen.classList.add("hidden-app");
    appShell.classList.remove("hidden-app");
});


// ---------- SETTINGS DRAWER ----------

openSettingsBtn.addEventListener("click", openSettings);
closeSettingsBtn.addEventListener("click", closeSettings);
drawerOverlay.addEventListener("click", closeSettings);

function openSettings() {
    settingsDrawer.classList.add("drawer-open");
    drawerOverlay.classList.add("overlay-open");
}

function closeSettings() {
    settingsDrawer.classList.remove("drawer-open");
    drawerOverlay.classList.remove("overlay-open");
}

saveSettingsBtn.addEventListener("click", () => {
    const name = settingsNameInput.value.trim();
    const theme = settingsThemeSelect.value;
    const vibe = settingsVibeSelect.value;
    const music = settingsMusicInput.value.trim();

    savePreference("brieflyUserName", name);
    savePreference("brieflyTheme", theme);
    savePreference("brieflyStudyVibe", vibe);
    savePreference("brieflyCustomMusic", music);

    welcomeNameInput.value = name;
    welcomeThemeSelect.value = theme;

    applyTheme(theme);
    updateWelcomeHeadline(name);
    updateMainGreeting(name);

    closeSettings();
});

clearSettingsBtn.addEventListener("click", () => {
    localStorage.removeItem("brieflyUserName");
    localStorage.removeItem("brieflyTheme");
    localStorage.removeItem("brieflyStudyVibe");
    localStorage.removeItem("brieflyCustomMusic");

    welcomeNameInput.value = "";
    welcomeThemeSelect.value = "lavender";

    settingsNameInput.value = "";
    settingsThemeSelect.value = "lavender";
    settingsVibeSelect.value = "lofi";
    settingsMusicInput.value = "";

    applyTheme("lavender");
    updateWelcomeHeadline("");
    updateMainGreeting("");

    closeSettings();
});

settingsThemeSelect.addEventListener("change", () => {
    applyTheme(settingsThemeSelect.value);
});

welcomeThemeSelect.addEventListener("change", () => {
    applyTheme(welcomeThemeSelect.value);
});

function savePreference(key, value) {
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
    }
}

function applyTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
}


// ---------- SAMPLE NOTES ----------

document.querySelectorAll(".sample-btn").forEach(button => {
    button.addEventListener("click", () => {
        const sampleType = button.dataset.sample;
        notesInput.value = sampleNotes[sampleType] || "";
        notesInput.focus();
    });
});


// ---------- ANALYZE NOTES ----------

analyzeBtn.addEventListener("click", async () => {
    const text = notesInput.value.trim();
    errorMessage.textContent = "";

    if (!text) {
        errorMessage.textContent = "Paste some notes first so Briefly has something to work with.";
        return;
    }

    analyzeBtn.textContent = "Creating brief...";
    analyzeBtn.disabled = true;

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.error || "Something went wrong.";
            return;
        }

        latestStudyBrief = data;
        masteredCards = new Set();

        displayResults(data);
        saveRecentBrief(data);
        updateRecentBriefsDisplay();

    } catch (error) {
        errorMessage.textContent = "Unable to analyze notes. Make sure your Flask server is running.";
    } finally {
        analyzeBtn.textContent = "Create Study Brief";
        analyzeBtn.disabled = false;
    }
});

clearBtn.addEventListener("click", resetStudyArea);

function resetStudyArea() {
    notesInput.value = "";
    errorMessage.textContent = "";

    statsSection.classList.add("hidden");
    resultsSection.classList.add("hidden");

    latestStudyBrief = null;
    masteredCards = new Set();

    wordCountOutput.textContent = "0";
    sentenceCountOutput.textContent = "0";
    sessionTypeOutput.textContent = "—";
    masteredCountOutput.textContent = "0/0";
    progressText.textContent = "0/0 mastered";

    youtubePlayer.src = "";
    summaryOutput.textContent = "";
    keyIdeasOutput.innerHTML = "";
    keywordsOutput.innerHTML = "";
    studyPlanOutput.innerHTML = "";
    flashcardsOutput.innerHTML = "";
    simpleOutput.textContent = "";
}


// ---------- DISPLAY RESULTS ----------

function displayResults(data) {
    statsSection.classList.remove("hidden");
    resultsSection.classList.remove("hidden");

    wordCountOutput.textContent = data.stats.word_count;
    sentenceCountOutput.textContent = data.stats.sentence_count;
    sessionTypeOutput.textContent = data.stats.session_type;

    updateProgress(data.flashcards.length);

    displaySoundtrack(data);
    displayStudyPlan(data.study_plan);
    displayKeywords(data.keywords);
    displaySummary(data.summary);
    displayKeyIdeas(data.key_ideas);
    displaySimpleExplanation(data.simple_explanation);
    displayFlashcards(data.flashcards);

    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function displaySoundtrack(data) {
    const customMusic = localStorage.getItem("brieflyCustomMusic");
    const vibe = localStorage.getItem("brieflyStudyVibe") || "lofi";

    let soundtrack = data.soundtrack;

    if (vibePlayerLinks[vibe]) {
        soundtrack = {
            title: vibePlayerLinks[vibe].title,
            description: vibePlayerLinks[vibe].description,
            youtube_embed: vibePlayerLinks[vibe].embed,
            open_url: vibePlayerLinks[vibe].open
        };
    }

    if (customMusic) {
        const embedUrl = getYouTubeEmbedUrl(customMusic);

        soundtrackTitle.textContent = "Your Custom Study Soundtrack";
        soundtrackDescription.textContent = "Your saved music link is ready for this study session.";
        soundtrackOpenLink.href = customMusic;

        if (embedUrl) {
            youtubePlayer.src = embedUrl;
            playerEmbedWrap.classList.remove("hidden");
            playerFallbackText.classList.add("hidden");
        } else {
            youtubePlayer.src = "";
            playerEmbedWrap.classList.add("hidden");
            playerFallbackText.classList.remove("hidden");
        }

        return;
    }

    soundtrackTitle.textContent = soundtrack.title;
    soundtrackDescription.textContent = soundtrack.description;
    soundtrackOpenLink.href = soundtrack.open_url;

    youtubePlayer.src = soundtrack.youtube_embed;
    playerEmbedWrap.classList.remove("hidden");
    playerFallbackText.classList.add("hidden");
}

function getYouTubeEmbedUrl(url) {
    try {
        const parsedUrl = new URL(url);
        let videoId = "";

        if (parsedUrl.hostname.includes("youtube.com")) {
            videoId = parsedUrl.searchParams.get("v");
        }

        if (parsedUrl.hostname.includes("youtu.be")) {
            videoId = parsedUrl.pathname.replace("/", "");
        }

        if (!videoId) {
            return null;
        }

        return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
        return null;
    }
}

function displayStudyPlan(planItems) {
    studyPlanOutput.innerHTML = "";

    planItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        studyPlanOutput.appendChild(li);
    });
}

function displayKeywords(keywords) {
    keywordsOutput.innerHTML = "";

    keywords.forEach(keyword => {
        const span = document.createElement("span");
        span.classList.add("keyword-pill");
        span.textContent = keyword;
        keywordsOutput.appendChild(span);
    });
}

function displaySummary(summary) {
    summaryOutput.textContent = summary;
}

function displayKeyIdeas(keyIdeas) {
    keyIdeasOutput.innerHTML = "";

    keyIdeas.forEach(idea => {
        const li = document.createElement("li");
        li.textContent = idea;
        keyIdeasOutput.appendChild(li);
    });
}

function displaySimpleExplanation(explanation) {
    simpleOutput.textContent = explanation;
}

function displayFlashcards(cards) {
    flashcardsOutput.innerHTML = "";

    cards.forEach((card, index) => {
        const article = document.createElement("article");
        article.classList.add("flashcard");
        article.dataset.index = index;

        const inner = document.createElement("div");
        inner.classList.add("flashcard-inner");

        const front = document.createElement("div");
        front.classList.add("flashcard-face", "flashcard-front");

        const back = document.createElement("div");
        back.classList.add("flashcard-face", "flashcard-back");

        front.innerHTML = `
            <p class="card-label">Card ${index + 1}</p>
            <h3>${card.question}</h3>
            <p class="flip-hint">Click to flip</p>
        `;

        back.innerHTML = `
            <p class="card-label">${card.term}</p>
            <p class="answer-text">${card.answer}</p>
            <button class="learned-btn" type="button">Mark learned</button>
        `;

        inner.appendChild(front);
        inner.appendChild(back);
        article.appendChild(inner);

        article.addEventListener("click", event => {
            if (event.target.classList.contains("learned-btn")) {
                event.stopPropagation();
                toggleLearned(index, event.target, cards.length);
                return;
            }

            article.classList.toggle("is-flipped");
        });

        flashcardsOutput.appendChild(article);
    });
}

function toggleLearned(index, button, totalCards) {
    const flashcard = button.closest(".flashcard");

    if (masteredCards.has(index)) {
        masteredCards.delete(index);
        button.textContent = "Mark learned";
        flashcard.classList.remove("learned-card");
    } else {
        masteredCards.add(index);
        button.textContent = "Learned ✓";
        flashcard.classList.add("learned-card");
    }

    updateProgress(totalCards);
}

function updateProgress(totalCards) {
    const mastered = masteredCards.size;

    masteredCountOutput.textContent = `${mastered}/${totalCards}`;
    progressText.textContent = `${mastered}/${totalCards} mastered`;
}


// ---------- COPY + DOWNLOAD ----------

copySummaryBtn.addEventListener("click", async () => {
    if (!latestStudyBrief) return;

    try {
        await navigator.clipboard.writeText(latestStudyBrief.summary);
        copySummaryBtn.textContent = "Copied!";
    } catch (error) {
        copySummaryBtn.textContent = "Copy failed";
    }

    setTimeout(() => {
        copySummaryBtn.textContent = "Copy Summary";
    }, 1400);
});

downloadBtn.addEventListener("click", () => {
    if (!latestStudyBrief) return;

    const fileText = buildStudyBriefText(latestStudyBrief);
    const blob = new Blob([fileText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const temporaryLink = document.createElement("a");
    temporaryLink.href = url;
    temporaryLink.download = "briefly-study-brief.txt";
    temporaryLink.click();

    URL.revokeObjectURL(url);
});

function buildStudyBriefText(data) {
    const keyIdeas = data.key_ideas.map((idea, index) => `${index + 1}. ${idea}`).join("\n");
    const keywords = data.keywords.join(", ");
    const studyPlan = data.study_plan.map((item, index) => `${index + 1}. ${item}`).join("\n");

    const flashcards = data.flashcards
        .map((card, index) => {
            return `Card ${index + 1}
Term: ${card.term}
Question: ${card.question}
Answer: ${card.answer}`;
        })
        .join("\n\n");

    return `BRIEFLY STUDY BRIEF

SESSION STATS
Words: ${data.stats.word_count}
Sentences: ${data.stats.sentence_count}
Session Type: ${data.stats.session_type}

STUDY PLAN
${studyPlan}

SUMMARY
${data.summary}

KEY IDEAS
${keyIdeas}

KEYWORDS
${keywords}

FLASHCARDS
${flashcards}

SIMPLE EXPLANATION
${data.simple_explanation}
`;
}


// ---------- RECENT BRIEFS ----------

function saveRecentBrief(data) {
    const recent = getRecentBriefs();

    const newBrief = {
        id: Date.now(),
        title: createRecentTitle(data),
        sessionType: data.stats.session_type,
        summary: data.summary,
        createdAt: new Date().toLocaleString()
    };

    const updatedRecent = [newBrief, ...recent].slice(0, 3);
    localStorage.setItem("brieflyRecentBriefs", JSON.stringify(updatedRecent));
}

function getRecentBriefs() {
    const rawRecent = localStorage.getItem("brieflyRecentBriefs");

    if (!rawRecent) {
        return [];
    }

    try {
        return JSON.parse(rawRecent);
    } catch (error) {
        return [];
    }
}

function createRecentTitle(data) {
    const firstKeyword = data.keywords[0] || "Study Notes";
    return `${capitalize(firstKeyword)} Brief`;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateRecentBriefsDisplay() {
    const recent = getRecentBriefs();

    if (!recent.length) {
        recentBriefsSection.classList.add("hidden");
        recentBriefsList.innerHTML = "";
        return;
    }

    recentBriefsSection.classList.remove("hidden");
    recentBriefsList.innerHTML = "";

    recent.forEach(brief => {
        const article = document.createElement("article");
        article.classList.add("recent-card");

        article.innerHTML = `
            <p class="mini-label">${brief.sessionType}</p>
            <h3>${brief.title}</h3>
            <p>${brief.summary}</p>
            <small>${brief.createdAt}</small>
        `;

        recentBriefsList.appendChild(article);
    });
}

clearRecentBtn.addEventListener("click", () => {
    localStorage.removeItem("brieflyRecentBriefs");
    updateRecentBriefsDisplay();
});